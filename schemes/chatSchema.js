const mongoose = require("mongoose");

const Chat = new mongoose.Schema({
   usersID: {
      type: Array,
      require: true
   },
   chat: {
      type: Array
   }
});
module.exports = mongoose.model("Chat", Chat);
