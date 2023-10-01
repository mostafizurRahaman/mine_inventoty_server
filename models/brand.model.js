const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Brand name should be required"],
         trim: true,
         lowercase: true,
         unique: true,
         minLength: [3, "Name min length 3 char"],
         maxLength: [100, "Name max length 100 char"],
      },
      description: String,
      email: {
         type: String,
         validator: [validator.isEmail, "Please enter a valid email"],
      },
      website: {
         type: String,
         validator: [validator.isURL, "Please enter a valid url"],
      },
      products: [
         {
            type: ObjectId,
            required: true,
            ref: "Product",
         },
      ],
      suppliers: [
         {
            name: {
               type: String,
               required: true,
            },
            id: {
               type: ObjectId,
               required: true,
               ref: "Supplier",
            },
         },
      ],
   },
   {
      timestamps: true,
   }
);

const Brand = mongoose.model("Brand", brandSchema);

//  schema middleware:
brandSchema.pre("save", function (next) {
   console.log(this.id + "will ready to post");
   next();
});

brandSchema.post("save", function (doc, next) {
   console.log(doc.name + "will posted");
   next();
});

brandSchema.methods.logger = function () {
   console.log("---------------------");
   console.log(this);
   console.log("---------------------");
};

module.exports = Brand;
