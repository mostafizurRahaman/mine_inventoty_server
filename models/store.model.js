const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "please enter an stroe name"],
         unique: true,
         lowercase: true,
         enum: {
            values: [
               "dhaka",
               "cattragram",
               "rongpur",
               "khulna",
               "mymensigh",
               "barisal",
               "rajshahi",
               "shylet",
            ],
            message: `{VALUE}  shouldn't be storename`,
         },
      },
      description: String,
      status: {
         type: String,
         required: true,
         enum: {
            values: ["active", "in-active"],
            message: `{VALUE} shouldn't be status, status will be active/in-active`,
         },
         default: "active",
      },
      manager: {
         name: {
            type: String,
            required: true,
         },
         id: {
            type: ObjectId,
            required: true,
            ref: "User",
         },
      },
   },
   {
      timestamps: true,
   }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
