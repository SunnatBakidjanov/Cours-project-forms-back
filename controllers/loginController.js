const bcrypt = require('bcrypt');
const UAParser = require('ua-parser-js');
const generateTokens = require('../utils/generateTokens');
const { User, RefreshToken } = require('../db/index');

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(400).json({
				errors: { message: ['INCORRECT_LOGIN_OR_PASSWORD'] },
			});
		}

		if (user.status === 'pending') {
			return res.status(403).json({
				errors: { message: ['INCORRECT_LOGIN_OR_PASSWORD'] },
			});
		}

		if (user.status === 'blocked') {
			return res.status(403).json({
				errors: { blockedMessage: ['USER_BLOCKED'] },
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				errors: { message: ['INCORRECT_LOGIN_OR_PASSWORD'] },
			});
		}

		user.last_login = new Date();
		await user.save();

		const parser = new UAParser(req.headers['user-agent']);
		const device = parser.getDevice();
		const os = parser.getOS();
		const browser = parser.getBrowser();

		const deviceType = device.type || 'desktop';
		const deviceInfo = `${deviceType} | ${os.name || 'unknown OS'} ${os.version || ''} | ${browser.name || 'unknown browser'} ${browser.version || ''}`;

		const { accessToken, refreshToken } = generateTokens({
			id: user.id,
			email: user.email,
		});

		let existingToken = await RefreshToken.findOne({
			where: {
				user_id: user.id,
				device_info: deviceInfo,
			},
		});

		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

		if (existingToken) {
			existingToken.token = refreshToken;
			existingToken.expires_at = expiresAt;
			await existingToken.save();
		} else {
			await RefreshToken.create({
				token: refreshToken,
				user_id: user.id,
				expires_at: expiresAt,
				device_info: deviceInfo,
			});
		}

		return res.json({
			accessToken,
			refreshToken,
			user: {
				name: user.name,
				surname: user.surname,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};
