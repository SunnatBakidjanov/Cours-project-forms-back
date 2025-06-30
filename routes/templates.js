const express = require('express');
const router = express.Router();
const controller = require('../controllers/templateController');
const checkAccessToken = require('../middleware/checkAccessToken');

router.post('/templates', checkAccessToken, controller.createTemplate);

router.get('/templates', controller.getAllTemplates);

router.get('/templates/:id', controller.getTemplateById);

module.exports = router;
