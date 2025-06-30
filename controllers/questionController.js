const { Question, Template } = require('../db/index');
const MESSAGE = require('../constants/messages');

exports.createQuestion = async (req, res) => {
	try {
		const { template_id, type, title, description, showInTable } = req.body;
		const template = await Template.findByPk(template_id);

		if (!template || template.user_id !== req.user.id) {
			return res.status(403).json({ message: MESSAGE.QUESTIONS.NO_RIGHTS });
		}

		const question = await Question.create({
			template_id,
			type,
			title,
			description,
			showInTable,
		});

		res.status(201).json(question);
	} catch (error) {
		console.error('Create question error:', error);
		res.status(500).json({ message: MESSAGE.SERVER_ERROR });
	}
};

exports.getQuestionsByTemplate = async (req, res) => {
	try {
		const templateId = req.params.templateId;
		const questions = await Question.findAll({
			where: { template_id: templateId },
			order: [['order', 'ASC']],
		});
		res.json(questions);
	} catch (error) {
		console.error('Fetch questions error:', error);
		res.status(500).json({ message: MESSAGE.SERVER_ERROR });
	}
};

exports.updateQuestion = async (req, res) => {
	try {
		const question = await Question.findByPk(req.params.id);
		if (!question) return res.status(404).json({ message: MESSAGE.QUESTIONS.NOT_FOUND });

		await question.update(req.body);
		res.json(question);
	} catch (err) {
		res.status(500).json({ message: MESSAGE.SERVER_ERROR });
	}
};

exports.deleteQuestion = async (req, res) => {
	try {
		const question = await Question.findByPk(req.params.id);
		if (!question) return res.status(404).json({ message: MESSAGE.QUESTIONS.NOT_FOUND });

		await question.destroy();
		res.json({ message: MESSAGE.QUESTIONS.DELETE });
	} catch (err) {
		res.status(500).json({ message: MESSAGE.SERVER_ERROR });
	}
};
