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

		let updated = false;
		let user = existingUser;

		if (!user) {
			const hashedPassword = await bcrypt.hash(password, 10);
			user = await User.create({
				name,
				surname,
				email,
				password: hashedPassword,
				status: 'pending',
			});
			updated = true;
		} else if (user.status === 'pending') {
			const incomingName = name?.trim();
			const incomingSurname = surname?.trim();

			if (incomingName && incomingName !== user.name.trim()) {
				user.name = incomingName;
				updated = true;
			}

			if (incomingSurname && incomingSurname !== user.surname.trim()) {
				user.surname = incomingSurname;
				updated = true;
			}

			if (updated) {
				await user.save();
			}
		}

		if (updated) {
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
		}

		return res.json({
			successful: {
				message: ['SUCCESSFUL_MESSAGE'],
				updatedDataMessage: ['UPDATED_DATA'],
			},
			status: user.status,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};
