const router = require("express").Router();
const ProductsSchema = require("../schemes/productsSchema");
const verify = require("../middleware/auth");
router.get("/products", async (req, res) => {
   const product = await ProductsSchema.find();
   res.json(product);
});
router.delete("/deleteProduct", verify, (req, res) => {
   const { id } = req.body;
   console.log(req.body);
   ProductsSchema.deleteOne({ _id: id }, err => {
      if (err) {
         res.status(400).json(err);
      } else {
         res.status(200).json("ok");
      }
   });
});

module.exports = router;
//
