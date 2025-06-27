const registerUser = require('../service/auth/registerUser');
const MESSAGES = require('../constants/messages');

const registrationController = async (req, res) => {
	try {
		const result = await registerUser(req.user, req.body);

		res.json({
			successful: {
				message: result,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: MESSAGES.SERVER_ERROR,
		});
	}
};

module.exports = registrationController;
