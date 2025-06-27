const loginUser = require('../service/auth/loginUser');
const MESSAGES = require('../constants/messages');
const TOKENS_LIVES = require('../constants/token-lives');

const login = async (req, res) => {
	try {
		const user = req.user;
		const { accessToken, refreshToken } = await loginUser(user, req.headers['user-agent']);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict',
			maxAge: TOKENS_LIVES.REFRESH_TOKEN_DATE,
		});

		return res.json({
			message: MESSAGES.LOGIN.CORRECT_USER,
			accessToken,
			user: {
				name: user.name,
				surname: user.surname,
				email: user.email,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};

module.exports = login;
