const { query } = require("express");
const {
   getProductService,
   createProductService,
   getProductByIdService,
   updateProductByIdService,
   deleteProductByIdService,
   handleBrand,
} = require("../services/product.service");

module.exports.getProducts = async (req, res, next) => {
   try {
      let filter = { ...req.query };
      const queryObject = {};
      console.log(filter);
      const excludedFields = ["sort", "limit", "page", "field"];
      excludedFields.forEach((field) => delete filter[field]);
      filter = JSON.parse(
         JSON.stringify(filter).replace(
            /\b(gt|lt|gte|lte|eq|ne)\b/g,
            (match) => `$${match}`
         )
      );
      if (req.query.sort) {
         const sortBy = req.query.sort.split(",").join(" ");
         queryObject.sortBy = sortBy;
      }
      if (req.query.field) {
         const field = req.query.field.split(",").join(" ");
         queryObject.field = field;
      }
      if (req.query.page) {
         let { page = 1, limit = 5 } = req.query;
         queryObject.skip = (page - 1) * parseInt(limit);
         queryObject.limit = limit * 1;
      }
      const products = await getProductService(filter, queryObject);
      res.status(200).send({
         status: "success",
         message: "products found successfully",
         data: products,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.createProduct = async (req, res, next) => {
   try {
      const product = await createProductService(req.body);
      res.status(200).send({
         status: "success",
         message: "product created successfully",
         data: product,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.getProductById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const product = await getProductByIdService(id);
      if (!product) {
         return res.status(400).send({
            status: "failed",
            message: `Product didn't found by id ${id}`,
         });
      }
      res.status(200).send({
         status: "success",
         message: "product found successfully",
         data: product,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.updateProductById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const product = await getProductByIdService(id);
      if (!product) {
         return res.status(400).send({
            status: "failed",
            message: `Product didn't find by id ${id}`,
         });
      }

      const result = await updateProductByIdService(id, req.body);
      if (!result.modifiedCount) {
         res.status(400).send({
            status: "failed",
            message: `Product didn't update by id ${id}`,
         });
      }

      res.status(200).send({
         status: "success",
         message: "product updated successfully",
         data: result,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.deleteProductById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const product = await getProductByIdService(id);
      if (!product) {
         return res.status(400).send({
            status: "failed",
            message: `Product didn't find by id ${id}`,
         });
      }

      const result = await deleteProductByIdService(id);
      if (!result.deletedCount) {
         res.status(400).send({
            status: "failed",
            message: `Product didn't delete by id ${id}`,
         });
      }
      const brandUpdate = await handleBrand(product._id, product.brand.id);
      if (!brandUpdate.modifiedCount) {
         return res.status(400).send({
            status: "failed",
            message: "Product deleted but not remove from brand",
         });
      }
      res.status(200).send({
         status: "success",
         message: "product delete successfully",
         data: result,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};
