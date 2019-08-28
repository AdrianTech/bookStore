const router = require("express").Router();
const ProductsSchema = require("../schemes/productsSchema");
router.get("/products", async (req, res) => {
   // const books = await products.find();
   // res.send();
   const product = await ProductsSchema.find();
   res.json(product);
});

module.exports = router;
