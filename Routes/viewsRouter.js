const express = require('express');
const viewsRouter = express.Router();
const viewsCntrl = require('../Controller/viewsController');
const authCntrl = require('../Controller/authController');

// viewsRouter.use(authCntrl.protect);
viewsRouter.route('/sign-up').get(viewsCntrl.signUp);
viewsRouter.route('/').get(viewsCntrl.logIn);
viewsRouter.get('/fill-form', authCntrl.protect, viewsCntrl.ulbForm);

module.exports = viewsRouter;
