const { User, EmailVerification } = require('../../db/index');

const changeUserStatus = async record => {
	const user = await User.findByPk(record.user_id);
	user.status = 'active';
	user.save();

	await EmailVerification.destroy({ where: { id: record.id } });
};

module.exports = changeUserStatus;
