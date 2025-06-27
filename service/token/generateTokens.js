const generateJWTTokens = require('../../utils/generateJWTTokens');
const { RefreshToken } = require('../../db/index');
const UAParser = require('ua-parser-js');

const generateTokens = async (user, userAgent) => {
	const parser = new UAParser(userAgent || '');
	const device = parser.getDevice();
	const os = parser.getOS();
	const browser = parser.getBrowser();

	const deviceType = device.type || 'desktop';
	const osName = os.name || 'unknown OS';
	const osVersion = os.version || '';
	const browserName = browser.name || 'unknown browser';
	const browserVersion = browser.version || '';

	const deviceInfo = `${deviceType} | ${osName} ${osVersion} | ${browserName} ${browserVersion}`.trim();

	const { accessToken, refreshToken } = generateJWTTokens({
		id: user.id,
		email: user.email,
	});

	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

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
