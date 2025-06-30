// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/questionController');
const checkAccessToken = require('../middleware/checkAccessToken');

router.post('/questions', checkAccessToken, controller.createQuestion);

router.get('/questions/:templateId', controller.getQuestionsByTemplate);

router.put('/questions/:id', checkAccessToken, controller.updateQuestion);

router.delete('/questions/:id', checkAccessToken, controller.deleteQuestion);

module.exports = router;
