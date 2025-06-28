const jwt = require('jsonwebtoken');
const getDeviceInfo = require('../../utils/getDeviceInfo');
const { RefreshToken, User } = require('../../db/index');
const generateJWTTokens = require('../../utils/generateJWTTokens');
const TOKENS_LIVES = require('../../constants/token-lives');
const MESSAGES = require('../../constants/messages');

const refreshSession = async req => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		const error = new Error(MESSAGES.REFRESH.NO_TOKEN);
		error.status = 400;
		throw error;
	}

	let payload;
	try {
		payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
	} catch {
		const error = new Error(MESSAGES.REFRESH.INVALID);
		error.status = 401;
		throw error;
	}

	const deviceInfo = getDeviceInfo(req.headers['user-agent']);

	const tokenRecord = await RefreshToken.findOne({
		where: {
			user_id: payload.id,
			device_info: deviceInfo,
			token: refreshToken,
		},
	});

	if (!tokenRecord) {
		const error = new Error(MESSAGES.REFRESH.INVALID);
		error.status = 401;
		throw error;
	}

	if (new Date(tokenRecord.expires_at) < new Date()) {
		const error = new Error(MESSAGES.REFRESH.EXPIRED);
		error.status = 403;
		throw error;
	}

	const user = await User.findByPk(payload.id);
	if (!user || user.status !== 'active') {
		const error = new Error(MESSAGES.USER.BLOCKED_OR_INACTIVE);
		error.status = 403;
		throw error;
	}

	const { accessToken, refreshToken: newRefreshToken } = generateJWTTokens({
		id: user.id,
		email: user.email,
	});

	const newExpiresAt = new Date(Date.now() + TOKENS_LIVES.REFRESH_TOKEN_DATE);

	tokenRecord.token = newRefreshToken;
	tokenRecord.expires_at = newExpiresAt;
	await tokenRecord.save();

	return {
		accessToken,
		newRefreshToken,
	};
};

module.exports = refreshSession;
