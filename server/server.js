require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const favRoutes = require('./routes/favorites');
const auth = require('./middleware/auth');


const app = express();
// server.js (or wherever you mount your routers)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

app.use(cors());
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
