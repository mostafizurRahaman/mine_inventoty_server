const Store = require("../models/store.model");

module.exports.getStoreService = async () => {
   const stores = await Store.find({});
   return stores;
};

module.exports.createStoreService = async (data) => {
   const store = new Store(data);
   const results = await store.save();
   return results;
};

module.exports.getStoreByIdService = async (id) => {
   const store = await Store.findOne({ _id: id });
   return store;
};

module.exports.updateStoreByIdService = async (id, data) => {
   const results = await Store.updateOne(
      { _id: id },
      { $set: data },
      {
         runValidators: true,
      }
   );
   return results;
};

module.exports.deleteStoreByIdService = async (id) => {
   const results = await Store.deleteOne({ _id: id });
   return results;
};
