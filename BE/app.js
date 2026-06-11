const express = require('express');
const cors = require('cors');

const app = express();

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://quanlybillard-deploy.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
  res.send('Billiards API is running...');
});

// Import Routes
const routes = require('./routes');

// Mount Routes
app.use('/api', routes);

module.exports = app;
