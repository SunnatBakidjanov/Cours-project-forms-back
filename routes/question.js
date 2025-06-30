const express = require('express');
const router = express.Router();
const controller = require('../controllers/questionController');
const checkAccessToken = require('../middleware/checkAccessToken');

router.post('/', checkAccessToken, controller.createQuestion);

router.get('/:templateId', controller.getQuestionsByTemplate);

router.delete('/:id', checkAccessToken, controller.deleteQuestion);
router.put('/:id', checkAccessToken, controller.updateQuestion);

module.exports = router;
