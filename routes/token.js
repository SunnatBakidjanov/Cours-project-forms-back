const express = require('express');
const router = express.Router();

const checkAccessToken = require('../middleware/checkAccessToken');

const { refresh } = require('../controllers/refreshController');
const userController = require('../controllers/userController');

router.post('/refresh-token', refresh);

router.get('/api/check-accec-token', checkAccessToken, userController);

module.exports = router;
