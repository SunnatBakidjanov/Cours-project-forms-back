const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('../db/index');

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(400).json({
				errors: { email: ['USER_NOT_FOUND'] },
			});
		}

		if (user.status === 'pending') {
			return res.status(403).json({
				errors: { email: ['EMAIL_NOT_VERIFIED'] },
			});
		}

		if (user.status === 'blocked') {
			return res.status(403).json({
				errors: { message: ['USER_BLOCKED'] },
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				errors: { password: ['INVALID_PASSWORD'] },
			});
		}

		user.last_login = new Date();
		await user.save();

		const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
		const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		await RefreshToken.create({
			token: refreshToken,
			user_id: user.id,
			expires_at: expiresAt,
		});

		return res.json({
			accessToken,
			refreshToken,
			user: {
				id: user.id,
				name: user.name,
				surname: user.surname,
				email: user.email,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};
