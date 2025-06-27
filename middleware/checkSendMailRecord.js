const { EmailVerification } = require('../db/index');
const MESSAGES = require('../constants/messages');

module.exports = async (req, res, next) => {
	const { token } = req.query;

	try {
		const record = await EmailVerification.findOne({ where: { token } });

		if (!record) {
			return res.status(400).json({ message: MESSAGES.MAIL_SEND_TOKEN.INVALID_TOKEN });
		}

		if (record.expires_at < new Date()) {
			await EmailVerification.destroy({ where: { id: record.id } });
			return res.status(400).json({ message: MESSAGES.MAIL_SEND_TOKEN.TOKEN_EXPIRED });
		}

		req.record = record;
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};
