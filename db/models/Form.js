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
			template_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			},
			key: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				defaultValue: () => uuidv4(),
			},
			createdAt: DataTypes.DATE,
		},
		{
			tableName: 'forms',
			timestamps: true,
			indexes: [
				{
					fields: ['key'],
				},
			],
		}
	);
};

module.exports = Form;
