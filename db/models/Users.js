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
			last_login: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
		},
		{
			timestamps: true,
			tableName: 'users',
			indexes: [{ fields: ['status'] }, { fields: ['role'] }],
		}
	);
};

module.exports = Users;
