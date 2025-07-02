const express = require('express');
const router = express.Router();
const checkAccessToken = require('../middleware/checkAccessToken');
const questionController = require('../controllers/questionController');

router.post('/form/:key/questions', checkAccessToken, questionController.createQuestion);

router.delete('/questions/:id', checkAccessToken, questionController.deleteQuestion);

router.patch('/questions/:id', checkAccessToken, questionController.updateQuestion);

router.get('/form/:key/questions', checkAccessToken, questionController.getQuestionsByFormKey);

module.exports = router;
