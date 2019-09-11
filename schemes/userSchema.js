const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   id: mongoose.Schema.Types.ObjectId,
   firstName: {
      type: String,
      require: true,
      min: 2,
      max: 100
   },
   lastName: {
      type: String,
      require: true,
      min: 3,
      max: 100
   },
   email: {
      type: String,
      require: true,
      max: 100,
      min: 5
   },
   nickName: {
      type: String,
      require: true,
      min: 3
   },
   password: {
      type: String,
      require: true,
      min: 8
   },
   phone: {
      type: String,
      require: false,
      min: 8
   },
   registerDate: {
      type: String,
      require: true,
      min: 3,
      max: 100
   }
});

module.exports = mongoose.model("user", userSchema);
