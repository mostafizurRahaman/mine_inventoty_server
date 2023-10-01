const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");

router
   .route("/")
   .get(storeController.getStores)
   .post(storeController.createStore);

router
   .route("/:id")
   .get(storeController.getStoreById)
   .patch(storeController.updateStoreById)
   .delete(storeController.deleteStoreById);

module.exports = router;