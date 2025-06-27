const jwt = require('jsonwebtoken');
const { RefreshToken, User } = require('../db/index');

exports.refresh = async (req, res) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(400).json({ message: 'NO_REFRESH_TOKEN' });
	}

	try {
		const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

		const savedToken = await RefreshToken.findOne({
			where: { token: refreshToken, user_id: payload.id },
		});

		if (!savedToken) {
			return res.status(401).json({ message: 'INVALID_REFRESH_TOKEN' });
		}

		const user = await User.findByPk(payload.id);
		if (!user || user.status !== 'active') {
			return res.status(401).json({ message: 'USER_BLOCKED_OR_NOT_ACTIVE' });
		}

		const newAccessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '5m' });

		return res.json({
			accessToken: newAccessToken,
		});
	} catch (err) {
		console.error(err);
		return res.status(401).json({ message: 'INVALID_REFRESH_TOKEN' });
	}
};
