const express = require("express");

const schemeRouter = express.Router();
const schemeController = require("../Controller/schemaController");
const authControler = require("../Controller/authController");

schemeRouter.use(authControler.protect, authControler.verify("super-admin"));
schemeRouter
  .route("/schemeUser")
  .post(schemeController.createScheme)
  .get(schemeController.getSchemes);

module.exports = schemeRouter;
