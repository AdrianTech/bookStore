const router = require("express").Router();
const { productValidation } = require("../schemes/validationSchema");
const ProductsSchema = require("../schemes/productsSchema");
const verify = require("../middleware/auth");
const multer = require("multer");
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "./images/");
   },
   filename: (req, file, cb) => {
      const date = new Date().toLocaleDateString();
      cb(null, date + file.originalname);
   }
});
const imageFilter = (req, file, cb) => {
   if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
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
   const { author, title, isActive, count, total, pages, date, desc, print, price } = req.body;
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
         res.status(201).json("Your product has been added to database");
      })
      .catch(err => {
         res.status(400).json(err);
      });
});
router.put("/editProduct", [verify, upload.single("cover")], (req, res) => {
   const { id, author, title, pages, date, desc, print, price } = req.body;
   let cover;
   if (!req.file) {
      console.log("Here");
      cover = "";
   } else cover = req.file.path;

   updatedData = {
      author,
      title,
      pages,
      date,
      desc,
      print,
      price,
      cover: cover
   };

   Object.entries(updatedData).forEach(([key, value]) => {
      if (value.length < 1) {
         delete updatedData[key];
      }
      return updatedData;
   });
   console.log(updatedData);

   ProductsSchema.findByIdAndUpdate(id, updatedData, err => {
      if (err) return res.status(500).send(err);
      return res.status(200).json("Document has been updated");
   });
});

module.exports = router;
