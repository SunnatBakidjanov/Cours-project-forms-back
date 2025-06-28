const { User } = require('../db/index');
const MESSAGES = require('../constants/messages');

module.exports = async (req, res, next) => {
	const user = await User.findByPk(req.user.id);

	try {
		if (!user || user.status !== 'active') {
			return res.status(403).json({ message: MESSAGES.USER.USER_STATUS_BLOCKED });
		}

		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};
