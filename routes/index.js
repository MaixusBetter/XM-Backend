const router = require('express').Router();
const apiRoutes = require('./api');

// Use the API routes defined in the './api' file for any requests starting with '/api'
router.use('/api', apiRoutes);

// Handle all other routes not matched by the above routes
// This is a catch-all for undefined routes, responding with a "Wrong Route!" message
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
