const MESSAGES = require('../constants/messages');
const createForm = require('../service/form/createForm');
const { Forms, User } = require('../db/index');

exports.createForm = async (req, res) => {
	try {
		const newForm = await createForm(req);

		res.status(201).json(newForm);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};

exports.updateForm = async (req, res) => {
	const { key } = req.params;
	const { title, description } = req.body;

	try {
		const form = await Forms.findOne({ where: { key } });

		if (!form) {
			return res.status(404).json({ message: MESSAGES.FORMS.NOT_FOUND });
		}

		if (form.user_id !== req.user.id) {
			return res.status(403).json({ message: MESSAGES.USER.USER_NOT_FOUND });
		}

		form.title = title;
		form.description = description;

		await form.save();

		res.status(200).json({ message: MESSAGES.FORMS.SUCCESS });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};

exports.getFormByKey = async (req, res) => {
	const { key } = req.params;

	try {
		const form = await Forms.findOne({ where: { key } });

		if (!form) {
			return res.status(404).json({ message: MESSAGES.FORMS.NOT_FOUND });
		}

		if (!form.isPublic && form.user_id !== req.user.id) {
			return res.status(403).json({ message: MESSAGES.USER.USER_NOT_FOUND });
		}

		res.status(200).json(form);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};
