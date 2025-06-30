const jwt = require('jsonwebtoken');
const MESSAGE = require('../constants/messages');

module.exports = (req, res, next) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json({ message: MESSAGE.USER.USER_NOT_AUTORIZED });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(403).json({ message: MESSAGE.TOKEN.INVALID_OR_EXPIRED_ACCESS_TOKEN });
	}
};
