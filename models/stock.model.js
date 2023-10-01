const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
   {
      products: [
         {
            type: ObjectId,
            required: true,
            ref: "Product",
         },
      ],
      name: {
         type: String,
         required: [true, "Please enter a  stock name"],
         trim: true,
         lowercase: true,
         unique: true,
         minLength: [3, "stock name should be min 3 char"],
         maxLength: [100, "stock name should be max 100 char"],
      },
      description: String,
      uint: {
         type: String,
         required: true,
         enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: `{VALUE} shouldn\'t be unit. unit will be kg/litre/pcs/bag`,
         },
      },
      price: {
         type: Number,
         required: true,
         min: [0, "min price should be 0"],
      },
      quantity: {
         type: Number,
         required: true,
         min: [0, "min quantity will be 0"],
      },

      imageURLs: [
         {
            type: String,
            required: true,
            validate: {
               validator: (value) => {
                  if (!Array.isArray(value)) {
                     return false;
                  }
                  const isValid = true;
                  value.forEach((url) => {
                     if (validator.isURL(url)) {
                        isValid = false;
                     }
                  });
                  return isValid;
               },
            },
         },
      ],
      status: {
         type: String,
         required: true,
         enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: `{VALUE} shouldn't be status`,
         },
      },
      category: {
         name: {
            type: String,
            required: true,
         },
      },
      brand: {
         name: {
            type: String,
            required: true,
         },
         id: {
            type: ObjectId,
            required: true,
            ref: "Brand",
         },
      },
      store: {
         name: {
            type: String,
            required: true,
         },
         id: {
            type: ObjectId,
            required: true,
            ref: "Store",
         },
      },
   },
   {
      timestamps: true,
   }
);

stockSchema.pre("save", function (next) {
   console.log(this.name + "ready to be posted");
   next();
});

stockSchema.post("save", function (doc, next) {
   console.log(doc.name + "Posted successfully");
   next();
});

stockSchema.methods.logger = function () {
   console.log(this.name + "posted successfully from logger");
};

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
