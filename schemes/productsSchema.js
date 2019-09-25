const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
   id: mongoose.Schema.Types.ObjectId,
   author: {
      type: String,
      require: false
   },
   title: {
      type: String,
      require: false
   },
   cover: {
      type: String,
      require: false
   },
   pages: {
      type: String,
      require: false
   },
   desc: {
      type: String,
      require: false
   },
   print: {
      type: String,
      require: false
   },
   price: {
      type: String,
      require: false
   },
   date: {
      type: String
   },
   isActive: {
      type: Boolean
   },
   count: {
      type: String
   },
   total: {
      type: String
   },
   addedDate: {
      type: String
   }
});

module.exports = mongoose.model("products", ProductsSchema);
