const Question = (sequelize, DataTypes) => {
	return sequelize.define(
		'Question',
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
			},
			template_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			},
			type: {
				type: DataTypes.ENUM('shortText', 'longText', 'number', 'checkbox'),
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			showInTable: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			order: {
				type: DataTypes.INTEGER.UNSIGNED,
				defaultValue: 0,
			},
		},
		{
			tableName: 'question',
			timestamps: true,
		}
	);
};

module.exports = Question;
