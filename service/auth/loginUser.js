const generateTokens = require('../token/generateTokens');

const loginUser = async (user, userAgent) => {
	user.last_login = new Date();
	await user.save();

	const { accessToken, refreshToken } = await generateTokens(user, userAgent);

	return { accessToken, refreshToken };
};

module.exports = loginUser;
