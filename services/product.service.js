const Brand = require("../models/brand.model");
const Product = require("../models/product.model");

module.exports.getProductService = async (filter, queryObject) => {
   console.log(queryObject);
   const products = await Product.find(filter)
      .sort(queryObject.sortBy)
      .select(queryObject.field)
      .skip(queryObject.skip)
      .limit(queryObject.limit);
   const total = await Product.countDocuments(filter);
   return { total, products };
};

module.exports.createProductService = async (data) => {
   const product = await Product.create(data);
   const { _id: productId, brand } = product;
   const brandProduct = await Brand.updateOne(
      { _id: brand.id },
      { $push: { products: productId } },
      {
         runValidators: true,
      }
   );
   if (brandProduct.modifiedCount) {
      return product;
   }
};

module.exports.getProductByIdService = async (id) => {
   const product = await Product.findOne({ _id: id });
   return product;
};

module.exports.updateProductByIdService = async (id, data) => {
   const results = await Product.updateOne({ _id: id }, data, {
      runValidators: true,
   });
   return results;
};

module.exports.deleteProductByIdService = async (id) => {
   const results = await Product.deleteOne({ _id: id });
   return results;
};

module.exports.handleBrand = async (productId, brandId) => {
   const results = await Brand.updateOne(
      { _id: brandId },
      { $pull: { products: productId } },
      {
         runValidators: true,
      }
   );
   return results;
};
