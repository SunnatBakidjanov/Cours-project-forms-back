require('dotenv').config();
const express = require('express');
const { sequelize, users } = require('./db/db_connect');

const app = express();
const PORT = process.env.PORT;

(async () => {
	try {
		await sequelize.authenticate();
		console.log('✅ Connection to MariaDB has been established successfully.');

		await sequelize.sync({ alter: true });

		console.log('✅ All models were synchronized successfully.');

		app.get('/', (req, res) => {
			res.send('🚀 Server and DB are ready!');
		});

		app.listen(PORT, () => {
			console.log(`🚀 Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('❌ Unable to connect to the database:', error);
	}
})();
