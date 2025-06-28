const getUserById = require('../service/token/userService');
const MESSAGES = require('../constants/messages');

const userController = async (req, res) => {
	try {
		const userId = req.user.id;
		const userData = await getUserById(userId);

		res.json({ user: userData });
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).json({ message: err.message || MESSAGES.SERVER_ERROR });
	}
};

module.exports = userController;
