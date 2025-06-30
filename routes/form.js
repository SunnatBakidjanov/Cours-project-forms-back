const express = require('express');
const router = express.Router();

const formsController = require('../controllers/formsController');
const checkAccessToken = require('../middleware/checkAccessToken');

router.post('/create-form', checkAccessToken, formsController.createForm);

module.exports = router;
