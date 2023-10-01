const express = require("express");
const router = express.Router();

const productRouter = require("../controllers/product.controller");

router
   .route("/")
   .get(productRouter.getProducts)
   .post(productRouter.createProduct);

router
   .route("/:id")
   .get(productRouter.getProductById)
   .patch(productRouter.updateProductById)
   .delete(productRouter.deleteProductById);

module.exports = router;
