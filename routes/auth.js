const express = require('express');
const router = express.Router();

const checkUnverifiedUser = require('../middleware/checkUnverifiedUser');

const registrationController = require('../controllers/registrationController');
const verificationController = require('../controllers/verificationController');
const resendVerificationEmail = require('../controllers/emailController');
const loginController = require('../controllers/loginController');

router.post('/register', registrationController.register);

router.get('/verify', verificationController.verifyEmail);

router.post('/resend-verification', checkUnverifiedUser, resendVerificationEmail);

router.post('/login', loginController.login);

module.exports = router;
