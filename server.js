require('dotenv').config();
const express = require('express');
const { sequelize } = require('./db/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

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

(async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({ alter: true });

		app.get('/', (req, res) => {
			res.send('🚀 Server and DB are ready!');
		});

		app.listen(PORT, () => {
			console.log(`🚀 Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('❌ Unable to connect to the database:', error);
	}
})();
