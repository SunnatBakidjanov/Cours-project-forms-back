const { User, EmailVerification } = require('../db/index');
const crypto = require('crypto');
const transporter = require('../utils/mailer');
const { getVerificationEmail } = require('../templates/emailTemplates');

exports.resendVerificationEmail = async (req, res) => {
	const { email, lang, theme } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(404).json({ message: 'USER_NOT_FOUND' });
		}

		if (user.status === 'active') {
			return res.status(400).json({ message: 'USER_ALREADY_VERIFIED' });
		}

		await EmailVerification.destroy({ where: { user_id: user.id } });

		const token = crypto.randomBytes(32).toString('hex');
		const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

		await EmailVerification.create({
			user_id: user.id,
			token,
			expires_at: expiresAt,
		});

		const { subject, html } = getVerificationEmail({
			lang,
			name: user.name,
			surname: user.surname,
			token,
			theme,
		});

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject,
			html,
		});

		return res.json({ message: 'VERIFICATION_EMAIL_RESENT' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'SERVER_ERROR' });
	}
};
