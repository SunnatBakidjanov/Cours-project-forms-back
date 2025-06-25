require('dotenv').config();
require('./utils/cron');
const express = require('express');
const cors = require('cors');
const sequelize = require('./db/db_connect');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const refreshRoutes = require('./routes/token');

const app = express();
const PORT = process.env.PORT || 3306;

app.use(
	cors({
		origin: 'https://sunnatbakidjanov.codes',
		credentials: true,
	})
);

app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', refreshRoutes);

app.get('/', (req, res) => {
	res.send('Server is running.');
});

(async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();
