const express = require('express');
const router = express.Router();

const formsController = require('../controllers/formsController');
const checkAccessToken = require('../middleware/checkAccessToken');

router.post('/create-form', checkAccessToken, formsController.createForm);

router.patch('/forms/:key', checkAccessToken, formsController.updateForm);

router.get('/forms/:key', checkAccessToken, formsController.updateForm);

module.exports = router;
