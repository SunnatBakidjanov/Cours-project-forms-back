const MESSAGES = require('../constants/messages');
const resendVerificationEmail = require('../service/auth/sendVerificationEmail');

const emeailController = async (req, res) => {
	try {
		await resendVerificationEmail(req.user, req.body);
		return res.status(200).json({ message: MESSAGES.VERIFICATION.VERIFICATION_EMAIL_RESENT });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};

module.exports = emeailController;
