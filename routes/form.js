const express = require('express');
const router = express.Router();

const formsController = require('../controllers/formsController');
const checkAccessToken = require('../middleware/checkAccessToken');

router.post('/create-form', checkAccessToken, formsController.createForm);

router.patch('/forms/:key', checkAccessToken, formsController.updateForm);

router.patch('/forms/:key/public', checkAccessToken, formsController.formPublic);

router.get('/forms/:key', checkAccessToken, formsController.getFormByKey);

router.get('/forms', checkAccessToken, formsController.getAllForms);

module.exports = router;
