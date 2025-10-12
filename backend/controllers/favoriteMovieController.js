const FavoriteMovie = require('../models/FavoriteMovie');
const User = require('../models/User');

exports.addFavoriteMovie = async (req, res) => {
  try {
    const { movieId, title, releaseDate, rating, posterUrl } = req.body;
    
    if (!movieId || !title || !releaseDate || rating === undefined || !posterUrl) {
      return res.status(400).json({ message: 'Всі поля обов\'язкові' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    const favoriteMovie = await FavoriteMovie.findOneAndUpdate(
      { userId: req.userId, movieId },
      { 
        userId: req.userId,
        movieId,
        title,
        releaseDate,
        rating,
        posterUrl
      },
      { new: true, upsert: true }
    );
    
    res.status(201).json({ 
      message: 'Фільм додано до улюблених',
      movie: favoriteMovie
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Цей фільм уже додано до улюблених' });
    }
    
    res.status(500).json({ message: 'Помилка при додаванні фільму', error: err.message });
  }
};

exports.removeFavoriteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    
    const result = await FavoriteMovie.deleteOne({ userId: req.userId, movieId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Фільм не знайдено в улюблених' });
    }
    
    res.json({ message: 'Фільм видалено з улюблених' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка при видаленні фільму', error: err.message });
  }
};

exports.getFavoriteMovies = async (req, res) => {
  try {
    const favoriteMovies = await FavoriteMovie.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json({ favoriteMovies });
  } catch (err) {
    res.status(500).json({ message: 'Помилка при отриманні улюблених фільмів', error: err.message });
  }
};

exports.checkFavoriteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    
    const movie = await FavoriteMovie.findOne({ userId: req.userId, movieId });
    
    res.json({ isFavorite: !!movie });
  } catch (err) {
    res.status(500).json({ message: 'Помилка при перевірці статусу фільму', error: err.message });
  }
};