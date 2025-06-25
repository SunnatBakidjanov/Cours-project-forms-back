const crypto = require('crypto');

module.exports = () => {
	const CRYPTO_LENGTH = 32;
	const token = crypto.randomBytes(CRYPTO_LENGTH).toString('hex');
	const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

	return {
		token,
		expiresAt,
	};
};
