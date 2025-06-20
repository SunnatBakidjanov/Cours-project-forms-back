const { User, EmailVerification } = require('../db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../utils/mailer');

exports.register = async (req, res) => {
	const { name, surname, email, password } = req.body;

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
		const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 час

		await EmailVerification.create({
			user_id: user.id,
			token,
			expires_at: expiresAt,
		});

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Confirm your email',
			html: `<p>Click <a href="${process.env.BASE_URL}/api/verify?token=${token}">here</a> to verify your email.</p>`,
		});

		return res.json({ message: 'Registration successful! Please verify your email.' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};
