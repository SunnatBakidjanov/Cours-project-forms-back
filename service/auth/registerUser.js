const bcrypt = require('bcrypt');

const MESSAGES = require('../../constants/messages');
const sendVerificationEmail = require('./sendVerificationEmail');
const { User } = require('../../db/index');

const registerUser = async (user, body) => {
	const { name, surname, email, password } = body;

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

		const passwordChanged = password && !(await bcrypt.compare(password, user.password));
		if (passwordChanged) {
			user.password = await bcrypt.hash(password, 10);
			updated = true;
		}

		if (updated) await user.save();
	}

	await sendVerificationEmail(user, body);

	if (updated) {
		return isNewUser ? MESSAGES.SUCCESSFUL.SUCCESSFUL_MESSAGE : MESSAGES.SUCCESSFUL.RESENDING_MESSAGE;
	}

	return MESSAGES.SUCCESSFUL.UPDATE_DATA;
};

module.exports = registerUser;
