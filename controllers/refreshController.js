const jwt = require('jsonwebtoken');
const getDeviceInfo = require('../utils/getDeviceInfo');
const { RefreshToken, User } = require('../db/index');
const generateJWTTokens = require('../utils/generateJWTTokens');
const TOKENS_LIVES = require('../constants/token-lives');
const MESSAGES = require('../constants/messages');

exports.refresh = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(400).json({ message: 'NO_REFRESH_TOKEN' });
		}

		const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

		const userAgent = req.headers['user-agent'];
		const deviceInfo = getDeviceInfo(userAgent);

		const tokenRecord = await RefreshToken.findOne({
			where: {
				user_id: payload.id,
				device_info: deviceInfo,
				token: refreshToken,
			},
		});

		if (!tokenRecord) {
			return res.status(401).json({ message: 'INVALID_REFRESH_TOKEN' });
		}

		if (new Date(tokenRecord.expires_at) < new Date()) {
			return res.status(403).json({ message: 'REFRESH_TOKEN_EXPIRED' });
		}

		const user = await User.findByPk(payload.id);
		if (!user || user.status !== 'active') {
			return res.status(403).json({ message: 'USER_BLOCKED_OR_INACTIVE' });
		}

		const { accessToken, refreshToken: newRefreshToken } = generateJWTTokens({
			id: user.id,
			email: user.email,
		});

		const newExpiresAt = new Date(Date.now() + TOKENS_LIVES.REFRESH_TOKEN_DATE);

		tokenRecord.token = newRefreshToken;
		tokenRecord.expires_at = newExpiresAt;
		await tokenRecord.save();

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict',
			maxAge: TOKENS_LIVES.REFRESH_TOKEN_DATE,
		});

		return res.json({
			accessToken,
			message: MESSAGES.REFRESH.SUCCESS,
		});
	} catch (err) {
		console.error('Refresh error:', err);
		return res.status(401).json({ message: 'MESSAGES.REFRESH.INVALID' });
	}
};
