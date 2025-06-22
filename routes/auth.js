const express = require('express');
const router = express.Router();

const registrationController = require('../controllers/registrationController');
const verificationController = require('../controllers/verificationController');
const emailController = require('../controllers/emailController');

router.post('/register', registrationController.register);

router.get('/verify', verificationController.verifyEmail);

router.post('/resend-verification', emailController.resendVerificationEmail);

module.exports = router;
