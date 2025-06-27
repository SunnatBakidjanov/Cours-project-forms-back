const generateJWTTokens = require('../../utils/generateJWTTokens');
const { RefreshToken } = require('../../db/index');
const getDeviceInfo = require('../../utils/getDeviceInfo');
const TOKENS_LIVES = require('../../constants/token-lives');

const generateTokens = async (user, userAgent) => {
	const deviceInfo = getDeviceInfo(userAgent);

	const { accessToken, refreshToken } = generateJWTTokens({
		id: user.id,
		email: user.email,
	});

	const expiresAt = new Date(Date.now() + TOKENS_LIVES.REFRESH_TOKEN_DATE);

	const [existingToken, created] = await RefreshToken.findOrCreate({
		where: { user_id: user.id, device_info: deviceInfo },
		defaults: {
			token: refreshToken,
			expires_at: expiresAt,
		},
	});

	if (!created) {
		existingToken.token = refreshToken;
		existingToken.expires_at = expiresAt;
		await existingToken.save();
	}

	return { accessToken, refreshToken };
};

module.exports = generateTokens;
