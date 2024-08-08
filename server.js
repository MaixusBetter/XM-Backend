const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Ensure correct path to the Sequelize connection configuration

const app = express();
const PORT = process.env.PORT || 3001; // Set the port to the environment variable PORT or default to 3001

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in the './routes' file for handling requests
app.use(routes);

// Sync Sequelize models to the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    // Log a message when the server starts successfully
    console.log(`App listening on port ${PORT}!`);
  });
});
