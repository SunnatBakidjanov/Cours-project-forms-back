exports.getVerificationEmail = (lang, name, token, theme) => {
	const subjects = {
		en: 'Confirm your email',
		ru: 'Подтвердите ваш email',
	};

	const buttonColor = theme ? '#3493ff' : '#ff9d00';

	const htmls = {
		en: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Hello, ${name}!</h2>
        <p>Thank you for registering. To complete your registration, please click the button below:</p>
        <p style="text-align: center;">
          <a href="${process.env.BASE_URL}/api/verify?token=${token}"
            style="
              display: inline-block;
              padding: 1rem 2rem;
              background-color: ${buttonColor};
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            ">
            Confirm Email
          </a>
        </p>
        <p>If you received this email by mistake, simply ignore it.</p>
      </div>
    `,
		ru: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Здравствуйте, ${name}!</h2>
        <p>Спасибо за регистрацию. Чтобы завершить регистрацию, пожалуйста, нажмите кнопку ниже:</p>
        <p style="text-align: center;">
          <a href="${process.env.BASE_URL}/api/verify?token=${token}"
            style="
              display: inline-block;
              padding: 1rem 2rem;
              background-color: ${buttonColor};
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            ">
            Подтвердить Email
          </a>
        </p>
        <p>Если вы получили это письмо случайно — просто проигнорируйте его.</p>
      </div>
    `,
	};

	return {
		subject: subjects[lang] || subjects.en,
		html: htmls[lang] || htmls.en,
	};
};
