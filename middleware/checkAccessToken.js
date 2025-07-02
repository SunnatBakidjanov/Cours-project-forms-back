const jwt = require('jsonwebtoken');
const MESSAGES = require('../constants/messages');

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: MESSAGES.TOKEN.NO_TOKEN_PROVIDED });
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		next();
	} catch {
		res.redirect('https://sunnatbakidjanov.codes/login');
		return res.status(401).json({ message: MESSAGES.TOKEN.INVALID_OR_EXPIRED_ACCESS_TOKEN });
	}
};
