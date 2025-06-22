const { User, EmailVerification } = require('../db/index');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../utils/mailer');
const { getVerificationEmail } = require('../templates/emailTemplates');

exports.register = async (req, res) => {
	const { name, surname, email, password, lang, theme } = req.body;

	try {
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser && existingUser.status === 'active') {
			return res.status(400).json({
				errors: {
					email: ['EMAIL_ALREADY_EXISTS'],
				},
			});
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

		const { subject, html } = getVerificationEmail({ lang, name, surname, token, theme });

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject,
			html,
		});

		return res.json({
			successful: {
				message: ['SUCCEFUL_MESSAGE'],
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};
