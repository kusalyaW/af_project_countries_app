// api/index.js
const serverless = require('serverless-http');
const express    = require('express');
const mongoose   = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// --- MongoDB connection ---
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser:    true,
  useUnifiedTopology: true,
});

// --- Import your routers ---
// assume you have server/routes/auth.js  and  server/routes/favorites.js
app.use('/api/auth',      require('../server/routes/auth'));
app.use('/api/favorites', require('../server/routes/favorites'));

// --- Optionally proxy countries (or keep calling restcountries directly from front-end) ---
// app.use('/api/countries', require('../server/routes/countries'));

module.exports = serverless(app);
