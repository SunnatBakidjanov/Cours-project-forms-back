const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const authenticate = require('../middleware/authenticate');

router.post('/templates', authenticate, templateController.createTemplate);

router.get('/templates', templateController.getAllTemplates);

router.get('/:id', templateController.getTemplateById);

module.exports = router;
