module.exports = (sequelize, DataTypes) => {
	const RefreshToken = sequelize.define('RefreshToken', {
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
		},
		expires_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		device_info: {
			type: DataTypes.STRING(512),
			allowNull: false,
		},
	});

	return RefreshToken;
};
