const { v4: uuidv4 } = require('uuid');

const Form = (sequelize, DataTypes) => {
	return sequelize.define(
		'Form',
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			},
			key: {
				type: DataTypes.STRING,
				unique: true,
				defaultValue: () => uuidv4(),
			},
			title: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
				defaultValue: null,
			},
			isPublic: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			tableName: 'forms',
			timestamps: true,
			indexes: [{ fields: ['key'] }],
		}
	);
};

module.exports = Form;
