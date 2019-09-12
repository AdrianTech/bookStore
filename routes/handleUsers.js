const router = require("express").Router();
const UserSchema = require("../schemes/userSchema");
const { registerSchema, loginValSchema } = require("../schemes/validationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/auth");

router.post("/register", async (req, res) => {
   const { fullname, email, nickName, password, phone, registerDate } = req.body;
   const { error } = registerSchema(req.body);
   if (error) return res.status(400).json(error.details[0].message);
   const checkIfEmailIsExist = await UserSchema.findOne({ email });
   if (checkIfEmailIsExist) return res.status(400).json("Email already exist");

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
   console.log(user);
   const token = jwt.sign({ _id: user._id }, process.env.USER_TOKEN, { expiresIn: 9000 });
   res.json({
      token,
      id: user._id,
      user: {
         userID: user._id,
         fullname: user.fullname,
         nickName: user.nickName,
         email: user.email,
         phone: user.phone,
         registerDate: user.registerDate
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

module.exports = router;
