const express = require('express');
const router = express.Router();

const checkAccessToken = require('../middleware/checkAccessToken');

const refresh = require('../controllers/refreshController');
const userController = require('../controllers/userController');

router.post('/refresh-token', refresh);

router.get('/check-me', checkAccessToken, userController);

module.exports = router;
