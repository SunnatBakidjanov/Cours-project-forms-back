const { User, EmailVerification } = require('../db/index');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../utils/mailer');
const { getVerificationEmail } = require('../utils/emailTemplates');

exports.register = async (req, res) => {
	const { name, surname, email, password, lang, theme } = req.body;

	try {
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: 'Email already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			surname,
			email,
			password: hashedPassword,
			status: 'pending',
		});

		const token = crypto.randomBytes(32).toString('hex');
		const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

		await EmailVerification.create({
			user_id: user.id,
			token,
			expires_at: expiresAt,
		});

		const { subject, html } = getVerificationEmail(lang, name, token, theme);

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject,
			html,
		});

		return res.json({ message: 'Registration successful! Please verify your email.' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};
