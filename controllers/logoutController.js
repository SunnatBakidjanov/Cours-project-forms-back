const { RefreshToken } = require('../db/index');
const MESSAGES = require('../constants/messages');

const logout = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		return res.status(400).json({ message: MESSAGES.REFRESH.NO_TOKEN });
	}

	try {
		await RefreshToken.destroy({ where: { token: refreshToken } });

		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: false,
			sameSite: 'None',
			path: '/',
		});

		return res.json({ message: MESSAGES.REFRESH.DELETED });
	} catch (error) {
		return res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};

module.exports = logout;
