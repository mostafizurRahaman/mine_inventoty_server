const Brand = require("../models/brand.model");

module.exports.getBrandsService = async () => {
   const brands = await Brand.find({}).populate("products").select('-supplier');
   return brands;
};

module.exports.createBrandService = async (data) => {
   const brand = new Brand(data);
   const results = await brand.save();
   console.log(brand);
   return results;
};

module.exports.getBrandByIdService = async (id) => {
   const brand = await Brand.findOne({ _id: id }).populate("products");
   return brand;
};

module.exports.updateBrandByIdService = async (id, data) => {
   const results = await Brand.updateOne(
      { _id: id },
      { $set: data },
      {
         runValidators: true,
      }
   );
   return results;
};

module.exports.deleteBrandServiceById = async (id) => {
   const result = await Brand.deleteOne({ _id: id });
   return result;
};
