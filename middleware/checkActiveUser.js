const { User } = require('../db/index');
const MESSAGES = require('../constants/messages');

module.exports = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (user && user.status === 'active') {
			return res.status(400).json({ message: MESSAGES.USER.USER_STATUS_ACTIVE });
		}

		req.user = user || null;
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};
