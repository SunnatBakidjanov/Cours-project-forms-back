const { User, EmailVerification } = require('../db/index');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../utils/mailer');

exports.register = async (req, res) => {
	const { name, surname, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ where: { email } });

		if (existingUser && existingUser.status === 'active') {
			return res.status(400).json({ message: 'Email already exists and verified' });
		}

		let user;
		if (existingUser && existingUser.status === 'pending') {
			user = existingUser;

			if (name) user.name = name;
			if (surname) user.surname = surname;
			if (password) {
				const hashedPassword = await bcrypt.hash(password, 10);
				user.password = hashedPassword;
			}
			await user.save();
		} else if (!existingUser) {
			const hashedPassword = await bcrypt.hash(password, 10);
			user = await User.create({
				name,
				surname,
				email,
				password: hashedPassword,
				status: 'pending',
			});
		}

		await EmailVerification.destroy({ where: { user_id: user.id } });

		const token = crypto.randomBytes(32).toString('hex');
		const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

		await EmailVerification.create({
			user_id: user.id,
			token,
			expires_at: expiresAt,
		});

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Confirm your email',
			html: `<p>Click <a href="${process.env.BASE_URL}/api/verify?token=${token}">here</a> to verify your account.</p>`,
		});

		return res.json({
			message: 'Check your email. We have sent a verification link.',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

exports.verifyEmail = async (req, res) => {
	const { token } = req.query;

	try {
		const record = await EmailVerification.findOne({ where: { token } });

		if (record.expires_at < new Date()) {
			await EmailVerification.destroy({ where: { id: record.id } });
			return res.status(400).json({ message: 'Token expired. Please register again.' });
		}

		if (!record) return res.status(400).json({ message: 'Invalid or expired token' });

		const user = await User.findByPk(record.user_id);
		user.status = 'active';
		await user.save();

		await EmailVerification.destroy({ where: { id: record.id } });

		res.redirect('https://sunnatbakidjanov.codes/login');
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};
