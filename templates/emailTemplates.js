exports.getVerificationEmail = ({ lang, name, surname, token, theme }) => {
	const safeLang = lang?.toLowerCase() || 'en';
	const buttonBg = theme ? '#3493ff' : '#ff9d00';
	const buttonTextColor = theme ? '#fff' : '#000';

	const subjects = {
		en: 'Confirm your email',
		ru: 'Подтвердите ваш email',
	};

	const messages = {
		en: {
			greeting: `Hello, ${name} ${surname}!`,
			intro: '😊 Thank you for registering.',
			instruction: '✅ To complete your registration, please follow the link below:',
			button: 'Confirm Email',
			footer: '❌ If you received this email by mistake, simply ignore it.',
		},
		ru: {
			greeting: `Здравствуйте, ${name} ${surname}!`,
			intro: '😊 Спасибо за регистрацию.',
			instruction: '✅ Чтобы завершить регистрацию, пожалуйста, перейдите по ссылке ниже:',
			button: 'Подтвердить Email',
			footer: '❌ Если вы получили это письмо случайно — просто проигнорируйте его.',
		},
	};

	const msg = messages[safeLang] || messages.en;

	const html = `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f9f9f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" style="background: #fff; border-radius: 12px; box-shadow: 2px 5px 30px #838383; padding: 2rem 3.5rem; font-family: Arial, sans-serif;">
          <tr>
            <td align="center" style="font-size: 28px; font-weight: bold;">
              Forms App
            </td>
          </tr>
          <tr>
            <td style="padding-top: 30px; font-size: 20px; font-weight: bold;">
              ${msg.greeting}
            </td>
          </tr>
          <tr>
            <td style="padding-top: 20px; font-size: 16px; color: #333;">
              ${msg.intro}
            </td>
          </tr>
          <tr>
            <td style="padding-top: 10px; font-size: 16px; color: #333;">
              ${msg.instruction}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top: 40px;">
              <a href="${process.env.BASE_URL}/api/verify?token=${token}"
                style="
                  background-color: ${buttonBg};
                  color: ${buttonTextColor};
                  padding: 14px 40px;
                  text-decoration: none;
                  font-weight: bold;
                  border-radius: 5px;
                  display: inline-block;
                ">
                ${msg.button}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 40px; font-size: 14px; color: #555;">
              ${msg.footer}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

	return {
		subject: subjects[safeLang] || subjects.en,
		html,
	};
};
