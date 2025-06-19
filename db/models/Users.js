module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
			},
			name: DataTypes.STRING(50),
			surname: DataTypes.STRING(50),
			email: {
				type: DataTypes.STRING(255),
				unique: true,
				allowNull: false,
			},
			password: DataTypes.STRING(255),
			status: {
				type: DataTypes.ENUM('pending', 'active', 'blocked'),
				defaultValue: 'pending',
			},
			role: {
				type: DataTypes.ENUM('user', 'admin', 'creator'),
				defaultValue: 'user',
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			last_login: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			timestamps: false,
			tableName: 'users',
		}
	);

	return User;
};
