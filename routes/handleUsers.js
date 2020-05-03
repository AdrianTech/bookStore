const router = require("express").Router();
const UserSchema = require("../schemes/userSchema");
const Chat = require("../schemes/chatSchema");
const mongoose = require("mongoose");
const { registerSchema, loginValSchema, updateSchema } = require("../schemes/validationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/auth");
router.delete("/deleteMessage/:id", async (req, res) => {
  const { id } = req.params;
  Chat.updateOne({ "chat.id": mongoose.Types.ObjectId(id) }, { $pull: { chat: { id: mongoose.Types.ObjectId(id) } } }, { multi: true }, err => {
    if (err) console.log(err);
  });
  res.status(200).json("Message deleted");
});
router.get("/getChatUser", verify, async (req, res) => {
  const user = await UserSchema.find().select("-password -phone -registerDate -email -fullname");
  res.status(200).json(user);
});
router.post("/getChatTalk/", async (req, res) => {
  const { userID, data } = req.body;
  const findChat = await Chat.findOne({ usersID: { $all: [userID, data] } });
  if (findChat) res.status(200).json(findChat.chat);
  else res.status(404).json("Not found");
});
router.post("/sendMessage", verify, async (req, res) => {
  const ObjectID = require("mongodb").ObjectID;
  const { Ids, chatMessage, from, time } = req.body;
  const findChat = await Chat.findOne({ usersID: { $all: Ids } });
  const data = {
    from,
    message: chatMessage,
    time,
    id: new ObjectID()
  };
  if (findChat) {
    const updateChat = await Chat.findOneAndUpdate({ usersID: { $all: Ids } }, { $addToSet: { chat: data } }, { new: true }, (err, data) => {
      if (err) return res.status(404).json("Not found");
      return res.status(200).json(data.chat);
    });
  } else {
    const newChat = new Chat({
      usersID: Ids,
      chat: [{ from, message: chatMessage, time, id: new ObjectID() }]
    });
    try {
      const createChat = await newChat.save();
      res.status(200).json(createChat.chat);
    } catch (err) {
      res.status(400).json("Error");
    }
  }
});

router.post("/register", async (req, res) => {
  const { fullname, email, nickName, password, phone, registerDate } = req.body;
  const { error } = registerSchema(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const checkIfEmailIsExist = await UserSchema.findOne({ email });
  if (checkIfEmailIsExist) return res.status(401).json("Email already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = new UserSchema({
    fullname,
    email,
    nickName,
    password: hashedPass,
    phone,
    registerDate
  });
  try {
    const createdUser = await newUser.save();
    res.status(200).json("your account has been successfully created");
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValSchema(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const user = await UserSchema.findOne({ email });
  if (!user) return res.status(400).json("Wrong email or password");
  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) return res.status(400).json("Wrong email or password");
  const token = jwt.sign({ _id: user._id }, process.env.USER_TOKEN, {
    expiresIn: 20000
  });
  res.json({
    token,
    id: user._id,
    user: {
      userID: user._id,
      fullname: user.fullname,
      nickName: user.nickName,
      email: user.email,
      phone: user.phone,
      registerDate: user.registerDate,
      isAdmin: user.isAdmin,
      isChatActive: user.isChatActive
    }
  });
});
router.get("/:id", verify, (req, res) => {
  const { id } = req.params;
  UserSchema.findById(id, (err, data) => {
    if (err) res.status(404);
    else res.json(data);
  }).select("-password");
});
router.put("/:id", verify, async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;
  if (!password) return res.json("You need to enter your password");
  const { error } = updateSchema(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const user = await UserSchema.findOne({ _id: id });
  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) return res.status(400).json("Wrong password");
  let data = req.body;
  if (data["newPassword"]) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPassword, salt);
    data["password"] = hashedPass;
    delete data["newPassword"];
  } else {
    delete data[("newPassword", "password")];
  }

  Object.entries(data).forEach(([key, value]) => {
    if (!value) delete data[key];
  });
  UserSchema.updateOne({ _id: id }, data, err => {
    if (err) return res.status(404).json("Not Found");
    res.status(200).json("Your data has been updated");
  });
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UserSchema.deleteOne({ _id: id });
    res.status(200).json("Account deleted");
  } catch (err) {
    res.status(404).json("Something went wrong");
  }
});

module.exports = router;
