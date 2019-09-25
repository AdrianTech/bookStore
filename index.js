const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 5500;
//Import routes

mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log("DB connected"));
const handleUsers = require("./routes/handleUsers");
const handleProducts = require("./routes/handleProducts");
const addNewProduct = require("./routes/addNewProduct");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/images", express.static("images"));
app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", handleProducts);
app.use("/user", handleUsers);
app.use("/", addNewProduct);
app.get("/*", function(req, res) {
   res.sendFile(path.join(__dirname, "client/build/index.html"), function(err) {
      if (err) {
         res.status(500).send(err);
      }
   });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
