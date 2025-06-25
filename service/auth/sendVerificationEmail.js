const { getVerificationEmail } = require('../../templates/emailTemplates');
const { EmailVerification } = require('../../db/index');
const gereateLinkTokens = require('../../utils/generateLinkTokens');
const transporter = require('../../utils/mailer');

const sendVerificationEmail = async (user, body) => {
	const { lang, theme } = body;

	await EmailVerification.destroy({ where: { user_id: user.id } });

	const { token, expiresAt } = gereateLinkTokens();

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

module.exports = sendVerificationEmail;
