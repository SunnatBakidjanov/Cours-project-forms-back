const express = require('express');
const router = express.Router();

const checkUnverifiedUser = require('../middleware/checkUnverifiedUser');
const checkUserNotActive = require('../middleware/checkUserNotActive');
const checkSendMailRecord = require('../middleware/checkSendMailRecord');

const registrationController = require('../controllers/registrationController');
const verificationController = require('../controllers/verificationController');
const loginController = require('../controllers/loginController');
const emeailController = require('../controllers/emailController');

router.post('/register', checkUserNotActive, registrationController);

router.get('/verify', checkSendMailRecord, verificationController);

router.post('/resend-verification-email', checkUnverifiedUser, emeailController);

router.post('/login', loginController.login);

module.exports = router;
