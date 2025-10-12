const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const favoriteMoviesRoutes = require('./routes/favoriteMoviesRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})); // дозволяє фронтенду надсилати запити
app.use(express.json()); // дозволяє читати JSON
app.use('/authorization', authRoutes); // логін і реєстрація
app.use('/favorites', favoriteMoviesRoutes); // улюблені

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB підключено'))
.catch((err) => console.error('MongoDB помилка:', err));

// Старт сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});