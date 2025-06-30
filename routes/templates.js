const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const checkAccessToken = require('../middleware/checkAccessToken');

router.post('/templates', checkAccessToken, templateController.createTemplate);

router.get('/templates', templateController.getAllTemplates);

router.get('/:id', templateController.getTemplateById);

module.exports = router;
