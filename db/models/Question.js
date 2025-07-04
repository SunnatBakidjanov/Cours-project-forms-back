const { v4: uuidv4 } = require('uuid');

const Question = (sequelize, DataTypes) => {
	return sequelize.define(
		'Question',
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
			text: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			tableName: 'questions',
			timestamps: true,
			indexes: [{ fields: ['form_key'] }],
		}
	);
};

module.exports = Question;
