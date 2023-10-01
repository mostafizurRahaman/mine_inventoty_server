const mongoose = require("mongoose");
const colors = require("colors");
const app = require("./app");
require("dotenv").config();
//  port :
const port = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE).then(() => {
   console.log(`Database Connected Sucessfully`.blue.bold);
});

//  main route of my server:
app.get("/", (req, res, next) => {
   res.send(`server is running now`);
});

//  listening port on server:
app.listen(port, () => {
   console.log(`Server is running on port:  ${port}`.green.bold);
});

// process.on("unhandledRejection", (err) => {
//    console.log(err.name, err.message);
//    app.close(() => {
//       process.exit(1);
//    });
// });

// if processing close the function will called.
process.on("unhandledRejection", (err) => {
   console.log(err.message, err.name);
   mongoose.connection
      .close()
      .then(() => {
         process.exit(1);
      })
      .catch((err) => {
         console.log("Error Closing mongoose connection", err.message);
         process.exit(1);
      });
});
