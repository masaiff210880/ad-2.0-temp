const express = require("express");
const router = express.Router();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AD-2.0",
      version: "1.0.0",
      description: "E - commerce website"
    },
    servers: [
      {
        // url: "http://localhost:7000/" //after set production server
        url: "http://31.220.20.11:8080/" //after set production server
      }
    ]
  },
  // apis: ["./index.js"]
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// router.use("/", (req, res) => {
//   res
//     .status(200)
//     .send("Welcome to the AD-2.0. To move ahead browse Product page");
// });

module.exports = router;
