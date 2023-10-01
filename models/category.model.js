const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please must enter a category name"],
         trim: true,
         lowercase: true,
         unique: true,
         minLength: [3, "Category name should be min 3 char"],
         maxLength: [100, "category name should be max 100 char"],
      },
      description: String,
      imageURLs: {
         type: String,
         required: [true, "Please enter a url"],
         validate: [validator.isURL, "Please enter a valid url"],
      },
   },
   {
      timestamps: true,
   }
);

categorySchema.pre("save", function (next) {
   console.log(this.name + "will ready to save");
   next();
});

categorySchema.post("save", function (doc, next) {
   console.log(doc.name + "was posted");
   next();
});

categorySchema.methods.logger = function () {
   console.log("----------------------------");
   console.log(this);
   console.log("----------------------------");
};

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
