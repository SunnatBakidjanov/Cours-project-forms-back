const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbConnect = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'mariadb',
	dialectOptions: {
		allowPublicKeyRetrieval: true,
		ssl: false,
	},
	logging: false,
});

module.exports = dbConnect;
