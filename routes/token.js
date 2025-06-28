const express = require('express');
const router = express.Router();

const checkAccessToken = require('../middleware/checkAccessToken');
const checkUserBeforeToken = require('../middleware/checkUserBeforeToken');

const refresh = require('../controllers/refreshController');
const userController = require('../controllers/userController');

router.post('/refresh-token', refresh);

router.get('/check-me', checkUserBeforeToken, checkAccessToken, userController);

module.exports = router;
