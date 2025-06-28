const express = require('express');
const router = express.Router();

const checkUnverifiedUser = require('../middleware/checkUnverifiedUser');
const checkActiveUser = require('../middleware/checkActiveUser');
const checkSendMailRecord = require('../middleware/checkSendMailRecord');
const checkLoginUser = require('../middleware/checkLoginUser');

const registrationController = require('../controllers/registrationController');
const verificationController = require('../controllers/verificationController');
const loginController = require('../controllers/loginController');
const emeailController = require('../controllers/emailController');

router.post('/register', checkActiveUser, registrationController);

router.get('/verify', checkSendMailRecord, verificationController);

router.post('/resend-verification-email', checkUnverifiedUser, emeailController);

router.post('/login', checkLoginUser, loginController);

module.exports = router;
