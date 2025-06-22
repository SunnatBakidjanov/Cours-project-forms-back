const jwt = require('jsonwebtoken');
const { User } = require('../db/index');

exports.protect = () => async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'NOT_AUTHORIZED' });
		}

		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findByPk(decoded.id);
		if (!user || user.status !== 'active') {
			return res.status(403).json({ message: 'ACCESS_DENIED' });
		}

		req.user = user;
		next();
	} catch (err) {
		console.error(err);
		return res.status(401).json({ message: 'INVALID_OR_EXPIRED_TOKEN' });
	}
};
