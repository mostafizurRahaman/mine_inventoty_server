const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// require routes:
const brandRouter = require("./routes/brand.route");
const categoryRouter = require("./routes/category.route");
const storeRouter = require("./routes/store.route");
const productRouter = require("./routes/product.route");

//  middlewares :
app.use(express.json());
app.use(cors());

//  use routes middlewares:
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/product", productRouter);

module.exports = app;
