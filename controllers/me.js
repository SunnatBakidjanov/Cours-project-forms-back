const jwt = require('jsonwebtoken');
const { User } = require('../../db');
const MESSAGES = require('../../constants/messages');

exports.getMe = async (req, res) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'NO_TOKEN_PROVIDED' });
		}

		const token = authHeader.split(' ')[1];

		let payload;
		try {
			payload = jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			return res.status(401).json({ message: 'INVALID_OR_EXPIRED_ACCESS_TOKEN' });
		}

		const user = await User.findByPk(payload.id);

		if (!user || user.status !== 'active') {
			return res.status(403).json({ message: 'USER_BLOCKED_OR_INACTIVE' });
		}

		return res.json({
			user: {
				id: user.id,
				name: user.name,
				surname: user.surname,
				email: user.email,
			},
		});
	} catch (err) {
		console.error('GetMe error:', err);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};
