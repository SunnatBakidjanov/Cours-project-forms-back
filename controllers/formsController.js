const MESSAGES = require('../constants/messages');
const createForm = require('../service/form/createForm');

exports.createForm = async (req, res) => {
	try {
		await createForm(req);

		res.status(201).json(newForm);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: MESSAGES.SERVER_ERROR });
	}
};
