const jwt = require('jsonwebtoken');
const MESSAGES = require('../constants/messages');
const { User } = require('../db/index');

module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	const user = await User.findOne({ where: email });

	if (!user) {
		return res.status(400).json({ message: MESSAGES.LOGIN.INCORRECT_LOGIN_OR_PASSWORD });
	}

	if (user.status === 'pending') {
		return res.status(403).json({ message: MESSAGES.LOGIN.USER_STATUS_PENDING });
	}

	if (user.status === 'blocked') {
		return res.status(403).json({ message: MESSAGES.LOGIN.BLOCKED_ACCAUNT });
	}

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: MESSAGES.TOKEN.NO_TOKEN_PROVIDED });
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		next();
	} catch {
		return res.status(401).json({ message: MESSAGES.TOKEN.INVALID_OR_EXPIRED_ACCESS_TOKEN });
	}
};
