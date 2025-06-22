const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'mariadb',
	dialectOptions: {
		allowPublicKeyRetrieval: true,
		ssl: false,
	},
	logging: false,
});

const User = require('./models/Users')(sequelize, DataTypes);
const EmailVerification = require('./models/EmailVerification')(sequelize, DataTypes);
const RefreshToken = require('./models/RefreshToken')(sequelize, DataTypes);

User.hasMany(EmailVerification, { foreignKey: 'user_id' });
User.hasMany(RefreshToken, { foreignKey: 'user_id' });

EmailVerification.belongsTo(User, { foreignKey: 'user_id' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
	sequelize,
	User,
	EmailVerification,
	RefreshToken,
};
