const loginUser = require('../service/auth/loginUser');
const MESSAGES = require('../constants/messages');

const login = async (req, res) => {
	try {
		const user = req.user;
		const { accessToken, refreshToken } = await loginUser(user, req.headers['user-agent']);

		return res.json({
			message: MESSAGES.LOGIN.CORRECT_USER,
			accessToken,
			refreshToken,
			user: {
				name: user.name,
				surname: user.surname,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};

module.exports = login;
