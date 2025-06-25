require('dotenv').config();
require('./utils/cron');
const express = require('express');
const dbConnect = require('./db/db_connect');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const refreshRouts = require('./routes/token');

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
app.use('/api', refreshRouts);

app.use('/api')(async () => {
	try {
		await dbConnect.authenticate();
		await dbConnect.sync({ force: true });

		app.get('/', (req, res) => {
			res.send('Server and DB are ready!');
		});

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();
