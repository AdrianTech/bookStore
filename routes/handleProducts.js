const router = require("express").Router();
const ProductsSchema = require("../schemes/productsSchema");
router.get("/products", async (req, res) => {
   const product = await ProductsSchema.find();
   res.json(product);
});

module.exports = router;
