const { configDotenv } = require("dotenv");
const Category = require("../models/category.model");

module.exports.getCategoryServices = async () => {
   const categories = await Category.find({});
   return categories;
};

module.exports.createCategoryService = async (data) => {
   const category = new Category(data);
   const results = await category.save();
   results.logger();
   return results;
};

module.exports.getCategoryByIdService = async (id) => {
   const category = await Category.findOne({ _id: id });
   return category;
};

module.exports.updateCategoryByIdService = async (id, data) => {
   const category = await Category.updateOne(
      { _id: id },
      { $set: data },
      {
         runValidators: true,
      }
   );
   console.log(data);
   return category;
};

module.exports.deleteCategoryByIdService = async (id) => {
   const results = await Category.deleteOne({ _id: id });
   return results;
};
