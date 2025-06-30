const { Forms } = require('../../db/index');

module.exports = async req => {
	const user_id = req.user.id;

	const newForm = await Forms.create({ user_id });

	return newForm;
};
