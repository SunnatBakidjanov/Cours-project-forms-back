const { DataTypes } = require('sequelize');
const sequelize = require('./db_connect');

const User = require('./models/Users')(sequelize, DataTypes);
const EmailVerification = require('./models/EmailVerification')(sequelize, DataTypes);
const RefreshToken = require('./models/RefreshToken')(sequelize, DataTypes);
const Template = require('./models/Template')(sequelize, DataTypes);
const Question = require('./models/Question')(sequelize, DataTypes);

User.hasMany(EmailVerification, { foreignKey: 'user_id' });
User.hasMany(RefreshToken, { foreignKey: 'user_id' });
User.hasMany(Template, { foreignKey: 'user_id' });

EmailVerification.belongsTo(User, { foreignKey: 'user_id' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });
Template.belongsTo(User, { foreignKey: 'user_id' });

Template.hasMany(Question, { foreignKey: 'template_id', onDelete: 'CASCADE' });

Question.belongsTo(Template, { foreignKey: 'template_id' });

module.exports = {
	User,
	EmailVerification,
	RefreshToken,
	Template,
	Question,
	sequelize,
};
