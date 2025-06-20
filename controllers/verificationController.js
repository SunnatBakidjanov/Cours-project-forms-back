const { User, EmailVerification } = require('../db');

exports.verifyEmail = async (req, res) => {
	const { token } = req.query;

	try {
		const record = await EmailVerification.findOne({ where: { token } });
		if (!record) {
			return res.status(400).json({ message: 'Invalid or expired token' });
		}

		if (record.expires_at < new Date()) {
			await EmailVerification.destroy({ where: { id: record.id } });
			return res.status(400).json({ message: 'Token expired. Please register again.' });
		}

		const user = await User.findByPk(record.user_id);
		user.status = 'active';
		await user.save();

		await EmailVerification.destroy({ where: { id: record.id } });

		res.redirect('https://sunnatbakidjanov.codes/login');
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};
