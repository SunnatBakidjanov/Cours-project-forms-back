const Users = (sequelize, DataTypes) => {
	return sequelize.define(
		'User',
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			surname: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM('pending', 'active', 'blocked'),
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
			defaultScope: {
				attributes: { exclude: ['password'] },
			},
			indexes: [{ fields: ['status'] }, { fields: ['role'] }],
		}
	);
};

module.exports = Users;
