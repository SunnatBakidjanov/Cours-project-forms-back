const express = require('express');
const router = express.Router();
const { refresh } = require('../controllers/refreshController');

router.post('/refresh-token', refresh);

module.exports = router;
