const express = require('express');
const wrapAsync = require('../utils/WrapAsync');
const passport = require('passport');
const router = express.Router();
const User= require('../models/User');
const { saveRedirectUrl } = require('../middleware');

const userController= require('../Controller/user');

router.route('/signUp')
   .get(userController.renderSignupForm)
   .post( wrapAsync(userController.signup));


router.route('/login')
   .get(userController.renderLoginForm)
   .post(saveRedirectUrl,
       passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
       userController.login);

router.get('/logout',userController.logout)
module.exports = router;