const User = require('../models/User');
const FavoriteMovie = require('../models/FavoriteMovie');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Налаштування multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Користувач уже існує' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Користувач зареєстрований' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка реєстрації', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Невірний пароль' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Помилка логіну', error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    const favoriteMovies = await FavoriteMovie.find({ userId: req.userId });
    
    const userProfile = {
      ...user.toObject(),
      favoriteMovies
    };
    
    res.json(userProfile);
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання профілю', error: err.message });
  }
};

exports.uploadPhoto = [
  upload.single('photo'),
  async (req, res) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });

      user.photo = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };

      await user.save();

      res.json({ message: 'Фото завантажено успішно' });
    } catch (err) {
      res.status(500).json({ message: 'Помилка при завантаженні фото', error: err.message });
    }
  }
];

exports.getPhoto = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.photo || !user.photo.data) {
      return res.status(404).json({ message: 'Фото не знайдено' });
    }

    res.set('Content-Type', user.photo.contentType);
    res.send(user.photo.data);
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання фото' });
  }
};