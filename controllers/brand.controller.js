const {
   getBrandsService,
   createBrandService,
   getBrandByIdService,
   updateBrandByIdService,
   deleteBrandServiceById,
} = require("../services/brand.services");

module.exports.getBrands = async (req, res, next) => {
   try {
      const brands = await getBrandsService();
      res.status(200).send({
         status: "success",
         message: "data found successfully",
         data: brands,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.createBrand = async (req, res, next) => {
   try {
      const brand = await createBrandService(req.body);
      res.status(200).send({
         status: "success",
         message: "brand created successfully",
         data: brand,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.getBrandById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const brand = await getBrandByIdService(id);
      if (!brand) {
         return res.status(400).send({
            status: "failed",
            message: "data not found for this " + id,
         });
      }
      res.status(200).send({
         status: "success",
         message: "data found successfully",
         data: brand,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.updateBrandById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const brand = await getBrandByIdService(id);
      if (!brand) {
         res.status(400).send({
            status: "failed",
            message: "data not found for this " + id,
         });
      }
      const results = await updateBrandByIdService(id, req.body);

      if (!results.modifiedCount) {
         return res.status(400).send({
            status: "failed",
            message: "brand not found updated with this id ",
            results,
         });
      }
      res.status(200).send({
         status: "success",
         message: "data updated successfully",
         data: results,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.deleteBrandById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const brand = await getBrandByIdService(id);
      if (!brand) {
         res.status(400).send({
            status: "failed",
            message: "brand not found for this " + id,
         });
      }
      const results = await deleteBrandServiceById(id);

      if (!results.deletedCount) {
         return res.status(400).send({
            status: "failed",
            message: "brand not found deleted with this id ",
         });
      }
      res.status(200).send({
         status: "success",
         message: "brand deleted successfully",
         data: results,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};
