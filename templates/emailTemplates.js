exports.getVerificationEmail = (lang, name, surname, token, theme) => {
	const safeLang = lang?.toLowerCase() || 'en';
	const buttonBg = theme ? '#3493ff' : '#ff9d00';
	const buttonTextColor = theme ? '#fff' : '#000'; // Светлая тема — белый, тёмная — чёрный

	const subjects = {
		en: 'Confirm your email',
		ru: 'Подтвердите ваш email',
	};

	const htmls = {
		en: `
      <div style="font-family: Arial, sans-serif; box-shadow: 2px 5px 30px #838383; padding: 2rem 2.5rem; border-radius: 20px; max-width: 600px; margin: auto; display: flex; flex-direction: column; background: #fff;">
        <h1 style="margin: 0; text-align: center;">Forms App</h1>
        <h2 style="margin: 1.5rem 0 0;">Hello, ${name} ${surname}!</h2>
        <p style="margin: 1rem 0 0;">😊 Thank you for registering.</p>
        <p style="margin: 0.5rem 0 0;">✅ To complete your registration, please follow the link below:</p>
        <p style="margin: 2rem 0 0; text-align: center;">
          <a href="${process.env.BASE_URL}/api/verify?token=${token}"
            style="
              display: inline-block;
              padding: 0.8rem 3.5rem;
              background-color: ${buttonBg};
              color: ${buttonTextColor};
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            ">
            Confirm Email
          </a>
        </p>
        <p style="margin: 3rem 0 0;">❌ If you received this email by mistake, simply ignore it.</p>
      </div>
    `,
		ru: `
      <div style="font-family: Arial, sans-serif; box-shadow: 2px 5px 30px #838383; padding: 2rem 2.5rem; border-radius: 20px; max-width: 600px; margin: auto; display: flex; flex-direction: column; background: #fff;">
        <h1 style="margin: 0; text-align: center;">Forms App</h1>
        <h2 style="margin: 1.5rem 0 0;">Здравствуйте, ${name} ${surname}!</h2>
        <p style="margin: 1rem 0 0;">😊 Спасибо за регистрацию.</p>
        <p style="margin: 0.5rem 0 0;">✅ Чтобы завершить регистрацию, пожалуйста, перейдите по ссылке ниже:</p>
        <p style="margin: 2rem 0 0; text-align: center;">
          <a href="${process.env.BASE_URL}/api/verify?token=${token}"
            style="
              display: inline-block;
              padding: 0.8rem 3.5rem;
              background-color: ${buttonBg};
              color: ${buttonTextColor};
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            ">
            Подтвердить Email
          </a>
        </p>
        <p style="margin: 3rem 0 0;">❌ Если вы получили это письмо случайно — просто проигнорируйте его.</p>
      </div>
    `,
	};

	return {
		subject: subjects[safeLang] || subjects.en,
		html: htmls[safeLang] || htmls.en,
	};
};
