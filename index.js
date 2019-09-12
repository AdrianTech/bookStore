const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 6000;
//Import routes

const db = mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log("DB connected"));
const handleUsers = require("./routes/handleUsers");
const handleProducts = require("./routes/handleProducts");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", handleProducts);
app.use("/user", handleUsers);
app.get("/*", function(req, res) {
   res.sendFile(path.join(__dirname, "client/build/index.html"), function(err) {
      if (err) {
         res.status(500).send(err);
      }
   });
});

app.listen(port, () => console.log(`Server started on port ${port}`));