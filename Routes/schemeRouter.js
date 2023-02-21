const express = require('express');

const schemeRouter = express.Router();
const schemeController = require('../Controller/schemaController');
// const authControler = require('../Controller/authController');

// schemeRouter.use(authControler.protect, authControler.verify('super-user'));
schemeRouter
  .route('/schemeUser')
  .post(schemeController.createScheme)
  .get(schemeController.getSchemes);

schemeRouter
  .route('/upload')
  .post(
    schemeController.uploadSchemePhoto,
    schemeController.resizeSchemePhoto,
    schemeController.schemeUploadPhoto
  );

module.exports = schemeRouter;
