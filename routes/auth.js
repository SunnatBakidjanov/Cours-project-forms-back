const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const verificationController = require('../controllers/verificationController');
const emailController = require('../controllers/emailController');

router.post('/register', authController.register);

router.get('/verify', verificationController.verifyEmail);

router.post('/resend-verification', emailController.resendVerificationEmail);

module.exports = router;
