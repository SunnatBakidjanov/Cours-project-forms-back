module.exports = (sequelize, DataTypes) => {
	const EmailVerification = sequelize.define(
		'EmailVerification',
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.INTEGER.UNSIGNED,
				allowNull: false,
			},
			token: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			expires_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			timestamps: false,
			tableName: 'email_verifications',
		}
	);

	return EmailVerification;
};
