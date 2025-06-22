const express = require('express');
const router = express.Router();

const registrationController = require('../controllers/registrationController');
const verificationController = require('../controllers/verificationController');
const emailController = require('../controllers/emailController');
const loginController = require('../controllers/loginController');

router.post('/register', registrationController.register);

router.get('/verify', verificationController.verifyEmail);

router.post('/resend-verification', emailController.resendVerificationEmail);

router.post('/login', loginController.login);

module.exports = router;
