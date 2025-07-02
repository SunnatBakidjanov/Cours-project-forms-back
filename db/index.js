const { DataTypes } = require('sequelize');
const sequelize = require('./db_connect');

const User = require('./models/Users')(sequelize, DataTypes);
const EmailVerification = require('./models/EmailVerification')(sequelize, DataTypes);
const RefreshToken = require('./models/RefreshToken')(sequelize, DataTypes);
const Forms = require('./models/Form')(sequelize, DataTypes);
const FormHeading = require('./models/FormHeading')(sequelize, DataTypes);
const Question = require('./models/Question')(sequelize, DataTypes);

User.hasMany(EmailVerification, { foreignKey: 'user_id' });
User.hasMany(RefreshToken, { foreignKey: 'user_id' });
User.hasMany(Forms, { foreignKey: 'user_id' });

EmailVerification.belongsTo(User, { foreignKey: 'user_id' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });
Forms.belongsTo(User, { foreignKey: 'user_id' });

Forms.hasMany(FormHeading, { foreignKey: 'form_key' });
Forms.hasMany(Question, { foreignKey: 'form_key' });

FormHeading.belongsTo(Forms, { foreignKey: 'form_key' });
Question.belongsTo(Forms, { foreignKey: 'form_key' });

module.exports = {
	User,
	EmailVerification,
	RefreshToken,
	FormHeading,
	Question,
	Forms,
	sequelize,
};
