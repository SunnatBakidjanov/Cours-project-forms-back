const { v4: uuidv4 } = require('uuid');

const FormHeading = (sequelize, DataTypes) => {
	return sequelize.define(
		'FormHeading',
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				unique: true,
				defaultValue: () => uuidv4(),
			},
			form_key: {
				type: DataTypes.STRING,
				allowNull: false,
				references: {
					model: 'forms',
					key: 'key',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			title: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			tableName: 'form_headings',
			timestamps: true,
			indexes: [{ fields: ['form_key'] }],
		}
	);
};

module.exports = FormHeading;
