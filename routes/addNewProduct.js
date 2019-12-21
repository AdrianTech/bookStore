const router = require("express").Router();
const { productValidation } = require("../schemes/validationSchema");
const ProductsSchema = require("../schemes/productsSchema");
const verify = require("../middleware/auth");
const UserSchema = require("../schemes/userSchema");
const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    const date = Date.now()
      .toString()
      .slice(0, 10);
    cb(null, `${date}-${file.originalname}`);
  }
});
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else cb(null, false);
};
const upload = multer({
  fileFilter: imageFilter,
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  }
});

router.post("/addNewProduct", [verify, upload.single("cover")], (req, res) => {
  const {
    author,
    title,
    isActive,
    count,
    total,
    pages,
    date,
    desc,
    print,
    price
  } = req.body;
  const { error } = productValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const product = new ProductsSchema({
    author,
    title,
    isActive,
    count,
    total,
    pages,
    date,
    desc,
    print,
    price,
    cover: req.file.path,
    addedDate: new Date().toLocaleString()
  })
    .save()
    .then(info => {
      res.status(201).json("Your product has been added to a database");
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
router.put("/chatStatus/:id/:chatStatus", (req, res) => {
  const { id, chatStatus } = req.params;
  UserSchema.findByIdAndUpdate(
    id,
    { $set: { isChatActive: chatStatus } },
    { new: true },
    (err, data) => {
      if (err) return res.status(400).json("Bad request");
      return res.status(200).json(data);
    }
  ).select("-password");
});
router.put("/editProduct", [verify, upload.single("cover")], (req, res) => {
  const { id } = req.body;
  updatedData = req.body;

  let cover;
  if (req.file) cover = { cover: req.file.path };
  Object.entries(updatedData).forEach(([key, value]) => {
    if (!value || value === "null" || key === "id") delete updatedData[key];
    if (cover) updatedData = { ...updatedData, ...cover };
    return updatedData;
  });
  ProductsSchema.findByIdAndUpdate(id, updatedData, (err, data) => {
    if (err) return res.status(404).json("Product not found");
    else {
      res.status(200).json("Document has been updated");
      fs.unlink(data.cover, err => {
        if (err) console.log(err);
      });
    }
  });
});
module.exports = router;
