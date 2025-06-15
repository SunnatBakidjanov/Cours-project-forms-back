const { Sequelize, DataTypes } = require('sequelize');

module.exports = function (sequelize) {
	return sequelize.define(
		'Users',
		{
			id: {
				type: Sequelize.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			surname: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
			},
			status: {
				type: DataTypes.ENUM('active', 'blocked'),
				allowNull: false,
				defaultValue: 'active',
			},
			role: {
				type: DataTypes.ENUM('user', 'admin', 'creator'),
				allowNull: false,
				defaultValue: 'user',
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			last_login: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
		},
		{
			timestamps: false,
			tableName: 'users',
		}
	);
};
