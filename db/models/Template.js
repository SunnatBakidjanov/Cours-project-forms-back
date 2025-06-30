const Template = (sequelize, DataTypes) => {
	return sequelize.define(
		'Template',
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
			title: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			theme: {
				type: DataTypes.STRING(50),
				allowNull: false,
				defaultValue: 'Other',
			},
			imageUrl: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			isPublic: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{
			timestamps: true,
			tableName: 'template',
		}
	);
};

module.exports = Template;
