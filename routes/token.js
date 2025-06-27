const express = require('express');
const router = express.Router();
const { refresh } = require('../controllers/refreshController');
const { getMe } = require('../controllers/auth/me');

router.post('/refresh-token', refresh);

router.get('/me', getMe);

module.exports = router;
