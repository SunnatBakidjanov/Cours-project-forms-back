const jwt = require('jsonwebtoken');
const TOKENS_LIVES = require('../constants/token-lives');

module.exports = payload => {
	const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: TOKENS_LIVES.ACCESS_TOKEN_LIVE_TIME_STR });
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: TOKENS_LIVES.REFRESH_TOKEN_LIVE_TIME_STR });
	return { accessToken, refreshToken };
};
