
require('dotenv').config();
const express = require('express');
const sequelize = require('./models/db');

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    app.get('/', (req, res) => {
      res.send('✅ Connection to MariaDB has been established successfully.');
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
})();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});