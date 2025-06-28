const { User } = require('../../db/index');
const MESSAGES = require('../../constants/messages');

const getUserById = async id => {
	const user = await User.findByPk(id);

	if (!user) {
		const error = new Error(MESSAGES.USER.USER_NOT_FOUND);
		error.status = 404;
		throw error;
	}

	if (user.status !== 'active') {
		const error = new Error(MESSAGES.USER.BLOCKED);
		error.status = 403;
		throw error;
	}

	return {
		id: user.id,
		name: user.name,
		surname: user.surname,
		email: user.email,
	};
};

module.exports = getUserById;
