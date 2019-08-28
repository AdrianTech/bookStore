const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
   id: mongoose.Schema.Types.ObjectId,
   author: {
      type: String,
      require: true,
      min: 2,
      max: 100
   },
   title: {
      type: String,
      require: true,
      min: 3,
      max: 100
   },
   cover: {
      type: String,
      require: true,
      max: 255,
      min: 5
   },
   pages: {
      type: Number,
      require: true,
      min: 3
   },
   desc: {
      type: String,
      require: true,
      min: 8
   },
   print: {
      type: String,
      require: true,
      min: 3
   },
   price: {
      type: String,
      require: true,
      min: 3
   },
   date: {
      type: String
   },
   isActive: {
      type: Boolean
   },
   count: {
      type: Number
   },
   total: {
      type: String
   }
});

module.exports = mongoose.model("products", ProductsSchema);
