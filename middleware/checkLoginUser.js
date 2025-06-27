const bcrypt = require('bcrypt');

const { User } = require('../db/index');
const MESSAGES = require('../constants/messages');

module.exports = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(400).json({ message: MESSAGES.LOGIN.INCORRECT_LOGIN_OR_PASSWORD });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: MESSAGES.LOGIN.INCORRECT_LOGIN_OR_PASSWORD });
		}

		if (user.status === 'pending') {
			return res.status(403).json({ message: MESSAGES.LOGIN.USER_STATUS_PENDING });
		}

		if (user.status === 'blocked') {
			return res.status(403).json({ message: MESSAGES.LOGIN.BLOCKED_ACCAUNT });
		}

		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json();
	}
};
