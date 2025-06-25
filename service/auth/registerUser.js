const bcrypt = require('bcrypt');

const MESSAGES = require('../../constants/messages');
const User = require('../../db/models/Users');

const registerUser = async (user, body) => {
	const { name, surname, email, password, lang, theme } = body;

	let updated = false;
	let isNewUser = false;

	if (!user) {
		const hashedPassword = await bcrypt.hash(password, 10);
		user = await User.create({
			name,
			surname,
			email,
			password: hashedPassword,
			status: 'pending',
		});
		updated = true;
		isNewUser = true;
	}

	if (user?.status === 'pending') {
		const incomingName = name?.trim();
		const incomingSurname = surname?.trim();

		if (incomingName && incomingName !== user.name.trim()) {
			user.name = incomingName;
			updated = true;
		}

		if (incomingSurname && incomingSurname !== user.surname.trim()) {
			user.surname = incomingSurname;
			updated = true;
		}

		if (updated) await user.save();
	}

	if (updated) {
		await sendVerificationEmail(user, lang, theme);
		return isNewUser ? MESSAGES.SUCCESSFUL.SUCCESSFUL_MESSAGE : MESSAGES.SUCCESSFUL.RESENDING_MESSAGE;
	}

	return MESSAGES.SUCCESSFUL.UPDATE_DATA;
};

module.exports = registerUser;
