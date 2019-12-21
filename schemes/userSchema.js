const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  fullname: {
    type: String,
    require: false
  },
  email: {
    type: String,
    require: false
  },
  nickName: {
    type: String,
    require: false
  },
  password: {
    type: String,
    require: false
  },
  phone: {
    type: String,
    require: false
  },
  registerDate: {
    type: String,
    require: false
  },
  isAdmin: {
    type: Boolean,
    require: false
  },
  isChatActive: {
    type: Boolean,
    require: true
  }
});

module.exports = mongoose.model("user", userSchema);
