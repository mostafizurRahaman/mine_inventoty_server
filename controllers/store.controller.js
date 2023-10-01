const {
   getStoreService,
   createStoreService,
   getStoreByIdService,
   updateStoreByIdService,
   deleteStoreByIdService,
} = require("../services/store.service.js");
module.exports.getStores = async (req, res, next) => {
   try {
      const stores = await getStoreService();
      res.status(200).send({
         status: "success",
         message: "stores found successfully",
         data: stores,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.createStore = async (req, res, next) => {
   try {
      const store = await createStoreService(req.body);
      res.status(200).send({
         status: "success",
         message: "store created successfully",
         data: store,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.getStoreById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const store = await getStoreByIdService(id);
      if (!store) {
         return res.status(400).send({
            status: "failed",
            message: `store not found for this ${id}`,
         });
      }
      res.status(200).send({
         status: "success",
         message: "store found successfully",
         data: store,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.updateStoreById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const store = await getStoreByIdService(id);
      if (!store) {
         return res.status(400).send({
            status: "failed",
            message: `store not found for this ${id}`,
         });
      }

      const result = await updateStoreByIdService(id, req.body);
      console.log(result);
      if (!result.modifiedCount) {
         return res.status(400).send({
            status: "failed",
            message: "store not updated successfully for this " + id,
         });
      }
      res.status(200).send({
         status: "success",
         message: "store updated  successfully",
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

module.exports.deleteStoreById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const store = await getStoreByIdService(id);
      if (!store) {
         return res.status(400).send({
            status: "failed",
            message: `store not found for this ${id}`,
         });
      }

      const result = await deleteStoreByIdService(id);
      console.log(result);
      if (!result.deletedCount) {
         return res.status(400).send({
            status: "failed",
            message: "store didn't delete successfully for this " + id,
         });
      }
      res.status(200).send({
         status: "success",
         message: "store deleted  successfully",
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
