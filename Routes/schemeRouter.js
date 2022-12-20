const express = require("express");

const schemeRouter = express.Router();
const schemeController = require("../Controller/schemaController");

schemeRouter.route("/schemeUser").post(schemeController.createScheme);

module.exports = schemeRouter;
