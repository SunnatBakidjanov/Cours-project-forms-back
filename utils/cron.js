const cron = require('node-cron');
const { Op } = require('sequelize');
const { EmailVerification } = require('../db/index'); // Подключи так, как ты подключаешь модели

cron.schedule('0 * * * *', async () => {
	try {
		await EmailVerification.destroy({
			where: {
				expires_at: {
					[Op.lt]: new Date(),
				},
			},
		});
	} catch (error) {
		console.error('❌ Error cleaning expired tokens:', error);
	}
});
