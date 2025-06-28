const refreshSession = require('../service/token/refreshSession');
const MESSAGES = require('../constants/messages');
const TOKENS_LIVES = require('../constants/token-lives');

const refresh = async (req, res) => {
	try {
		const { accessToken, newRefreshToken } = await refreshSession(req);

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: 'Lax',
			maxAge: TOKENS_LIVES.REFRESH_TOKEN_DATE,
		});

		res.json({
			accessToken,
			message: MESSAGES.REFRESH.SUCCESS,
		});
	} catch (error) {
		console.error('Refresh error:', error);

		res.status(error.status || 401).json({ message: error.message || MESSAGES.REFRESH.INVALID });
	}
};

module.exports = refresh;
