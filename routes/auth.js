const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const verificationController = require('../controllers/verificationController');

router.post('/register', authController.register);

router.get('/verify', verificationController.verifyEmail);

module.exports = router;
