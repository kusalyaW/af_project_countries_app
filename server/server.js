require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const favRoutes = require('./routes/favorites');
const auth = require('./middleware/auth');


const app = express();
// app.use(cors());
// CORS configuration
const allowedOrigins = [
    'https://af-project-countries-app-1.onrender.com/', // Production frontend URL
    // 'http://localhost:5173', // Development URL (for local testing)
];

app.use(cors({
    origin: function (origin, callback) {
        // Check if the origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,  // This is necessary if you're using cookies
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.use('/api/auth', authRoutes);
app.use('/api/favorites', auth, favRoutes);

if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
