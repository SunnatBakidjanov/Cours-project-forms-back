const { Forms } = require('../../db/index');

module.exports = async req => {
	const { template_id } = req.body;
	const user_id = req.user.id;

	const newForm = await Forms.create({
		template_id,
		user_id,
	});

	return newForm;
};
