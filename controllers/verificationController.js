const changeUserStatus = require('../service/auth/changeUserStatus');
const MESSAGES = require('../constants/messages');

const verificationController = async (req, res) => {
	try {
		await changeUserStatus(req.record);

		res.redirect('https://sunnatbakidjanov.codes/login');
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};

module.exports = verificationController;
