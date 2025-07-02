const { Question, Forms } = require('../db/index');
const MESSAGES = require('../constants/messages');

exports.createQuestion = async (req, res) => {
	const { key } = req.params;
	const { text } = req.body;

	try {
		const form = await Forms.findOne({ where: { key } });

		if (!form) return res.status(404).json({ message: MESSAGES.FORMS.NOT_FOUND });
		if (form.user_id !== req.user.id) return res.status(403).json({ message: MESSAGES.USER.USER_NOT_FOUND });

		const question = await Question.create({
			form_key: key,
			text,
		});

		res.status(201).json({
			question,
			message: MESSAGES.QUESTIONS.CREATED,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};

exports.deleteQuestion = async (req, res) => {
	const { id } = req.params;

	try {
		const question = await Question.findByPk(id);
		if (!question) return res.status(404).json({ message: MESSAGES.QUESTIONS.NOT_FOUND });

		const form = await Forms.findOne({ where: { key: question.form_key } });
		if (!form || form.user_id !== req.user.id) return res.status(403).json({ message: MESSAGES.USER.USER_NOT_FOUND });

		await question.destroy();
		res.status(200).json({ message: MESSAGES.QUESTIONS.DELETE });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};

exports.updateQuestion = async (req, res) => {
	const { id } = req.params;
	const { text } = req.body;

	try {
		const question = await Question.findByPk(id);
		if (!question) return res.status(404).json({ message: MESSAGES.QUESTIONS.NOT_FOUND });

		const form = await Forms.findOne({ where: { key: question.form_key } });
		if (!form || form.user_id !== req.user.id) return res.status(403).json({ message: MESSAGES.USER.USER_NOT_FOUND });

		question.text = text;
		await question.save();

		res.status(200).json({ message: MESSAGES.QUESTIONS.UPDATED });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};

exports.getQuestionsByFormKey = async (req, res) => {
	const { key } = req.params;

	try {
		const form = await Forms.findOne({ where: { key } });

		if (!form) {
			return res.status(404).json({ message: MESSAGES.FORMS.NOT_FOUND });
		}

		if (!form.isPublic && form.user_id !== req.user?.id) {
			return res.status(403).json({ message: 'Access denied' });
		}

		const questions = await Question.findAll({
			where: { form_key: key },
			order: [['createdAt', 'ASC']],
		});

		res.status(200).json(questions);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};
