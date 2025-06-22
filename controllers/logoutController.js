const { RefreshToken } = require('../db/index');

exports.logout = async (req, res) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(400).json({ message: 'NO_REFRESH_TOKEN' });
	}

	try {
		await RefreshToken.destroy({ where: { token: refreshToken } });
		return res.json({ message: 'LOGOUT_SUCCESS' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Server error' });
	}
};
