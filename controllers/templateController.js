const { Template, User } = require('../models');
const MESSAGE = require('../constants/messages');

exports.createTemplate = async (req, res) => {
	try {
		const { title, description, theme, imageUrl, isPublic } = req.body;
		const userId = req.user.id;

		const newTemplate = await Template.create({
			title,
			description,
			theme,
			imageUrl,
			isPublic,
			user_id: userId,
		});

		res.status(201).json(newTemplate);
	} catch (error) {
		console.error('Create Template Error:', error);
		res.status(500).json({ message: MESSAGE.SERVER_ERROR });
	}
};

exports.getAllTemplates = async (req, res) => {
	try {
		const userId = req.user?.id;

		const templates = await Template.findAll({
			where: userId
				? {
						[Op.or]: [{ isPublic: true }, { user_id: userId }],
					}
				: { isPublic: true },
			include: [{ model: User, attributes: ['id', 'name', 'email'] }],
			order: [['createdAt', 'DESC']],
		});

		res.json(templates);
	} catch (error) {
		console.error('Get Templates Error:', error);
		res.status(500).json({ message: MESSAGE.SERVER_ERROR });
	}
};

exports.getTemplateById = async (req, res) => {
	try {
		const template = await Template.findByPk(req.params.id, {
			include: [{ model: User, attributes: ['id', 'name', 'email'] }],
		});

		if (!template) {
			return res.status(404).json({ message: 'Шаблон не найден' });
		}

		if (!template.isPublic) {
			if (!req.user || (req.user.id !== template.user_id && !req.user.isAdmin)) {
				return res.status(403).json({ message: MESSAGE.TEMPLATES.NO_ACCESS_TO_TEMPLATE });
			}
		}

		res.json(template);
	} catch (error) {
		console.error('Get Template Error:', error);
		res.status(500).json({ message: MESSAGE.SERVER_ERROR });
	}
};
