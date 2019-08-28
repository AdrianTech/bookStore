const router = require("express").Router();
const UserSchema = require("../schemes/userSchema");
const { registerSchema, loginValSchema } = require("../schemes/validationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
   const { firstName, lastName, email, nickName, password, phone } = req.body;

   const { error } = registerSchema(req.body);
   if (error) return res.status(400).json(error.details[0].message);
   const checkIfEmailIsExist = await UserSchema.findOne({ email });
   if (checkIfEmailIsExist) return res.status(400).json("Email already exist");

   const salt = await bcrypt.genSalt(10);
   const hashedPass = await bcrypt.hash(password, salt);

   const newUser = new UserSchema({
      firstName,
      lastName,
      email,
      nickName,
      password: hashedPass,
      phone
   });
   try {
      const createdUser = await newUser.save();
      console.log(`user has been added to database`);
      res.status(200).json("Your account has been successfully created");
   } catch (err) {
      //console.log(err);
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
   const token = jwt.sign({ _id: user._id }, process.env.USER_TOKEN, { expiresIn: 200 });
   //res.json("You're logged in");
   return res
      .json({
         token,
         user: {
            user: user._id,
            name: user.firstName,
            email: user.email
         }
      })
      .json("You're logged in");
   //console.log(token + "HERE");
});

module.exports = router;
