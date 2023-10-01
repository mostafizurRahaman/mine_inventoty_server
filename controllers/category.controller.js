const {
   getCategoryServices,
   createCategoryService,
   getCategoryByIdService,
   updateCategoryByIdService,
   deleteCategoryByIdService,
} = require("../services/category.servicees");

module.exports.getCategories = async (req, res, next) => {
   try {
      const categories = await getCategoryServices();
      res.status(200).send({
         status: "success",
         message: "category found successfully",
         data: categories,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.createCategory = async (req, res, next) => {
   try {
      const category = await createCategoryService(req.body);
      res.status(200).send({
         status: "success",
         message: "category created  successfully",
         data: category,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.getCategoryById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const category = await getCategoryByIdService({ _id: id });
      if (!category) {
         res.status(400).send({
            status: "failed",
            message: "category not found for this " + id,
         });
      }
      res.status(200).send({
         status: "success",
         message: "category found successfully",
         data: category,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         data: err.names,
      });
   }
};

module.exports.updateCategoryById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const category = await getCategoryByIdService({ _id: id });
      if (!category) {
         res.status(400).send({
            status: "failed",
            message: "category not found for this " + id,
         });
      }
      const results = await updateCategoryByIdService(id, req.body);
      console.log(results);
      if (!results.modifiedCount) {
         res.status(400).send({
            status: "failed",
            message: `category not updated with this  ${id}`,
         });
      }
      res.status(200).send({
         status: "success",
         message: "category updated  successfully",
         data: results,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         data: err.names,
      });
   }
};

module.exports.deleteCategoryById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const category = await getCategoryByIdService({ _id: id });
      if (!category) {
         res.status(400).send({
            status: "failed",
            message: "category not found for this " + id,
         });
      }
      const results = await deleteCategoryByIdService(id);
      if (!results.deletedCount) {
         res.status(400).send({
            status: "failed",
            message: `category not deleted with this  ${id}`,
         });
      }
      res.status(200).send({
         status: "success",
         message: "category deleted  successfully",
         data: results,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         data: err.names,
      });
   }
};
