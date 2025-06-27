const RefreshToken = (sequelize, DataTypes) => {
	return sequelize.define(
		'RefreshToken',
		{
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
		},
		{
			timestamps: false,
			tableName: 'refresh_token',
		}
	);
};

module.exports = RefreshToken;
