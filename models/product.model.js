const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         minLength: [3, "Name should be min 3 char"],
         maxLength: [100, "Name should max 100 char"],
      },
      description: String,
      unit: {
         type: String,
         required: true,
         enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: `{VALUE} shouldn't unit, unit will be kg/litre/pcs/bag`,
         },
      },
      price: {
         type: Number,
         required: true,
         min: [0, "Price shouldn't be negative"],
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
                  let isValid = true;
                  value.forEach((url) => {
                     if (!validator.isURL(url)) {
                        isValid = false;
                     }
                  });
                  return isValid;
               },
            },
         },
      ],
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
            lowercase: true,
            trim: true,
         },
         id: {
            type: ObjectId,
            ref: "Brand",
            required: true,
         },
      },
   },
   {
      timestamps: true,
   }
);

const Product = mongoose.model("Product", productSchema);

productSchema.pre("save", function (next) {
   console.log(`${this.name}`);
   next();
});

productSchema.post("save", function (doc, next) {
   console.log(doc.name + "will be posted successfully");
   next();
});

productSchema.methods.logger = function () {
   console.log(this.name + `will be logged`);
};

module.exports = Product;
