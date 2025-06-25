const crypto = require('crypto');

const { getVerificationEmail } = require('../../templates/emailTemplates');
const EmailVerification = require('../../db/models/EmailVerification');
const transporter = require('../../utils/mailer');

const resendVerificationEmail = async (user, body) => {
	const { lang, theme } = body;

	await EmailVerification.destroy({ where: { user_id: user.id } });

	const CRYPTO_LENGTH = 32;
	const token = crypto.randomBytes(CRYPTO_LENGTH).toString('hex');
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
		to: user.email,
		subject,
		html,
	});
};

module.exports = resendVerificationEmail;
