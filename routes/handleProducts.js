const router = require("express").Router();
const ProductsSchema = require("../schemes/productsSchema");
const verify = require("../middleware/auth");
const fs = require("fs");
router.get("/products", async (req, res) => {
   const product = await ProductsSchema.find();
   res.json(product);
});
router.delete("/deleteProduct", verify, (req, res) => {
   const { id, cover } = req.body;
   ProductsSchema.deleteOne({ _id: id }, err => {
      if (err) {
         res.status(400).json(err);
      } else {
         res.status(200).json("This product was deleted");
         fs.unlink(cover, err => {
            if (err) console.log(err);
            console.log(`${cover} was deleted`);
         });
      }
   });
});
module.exports = router;
