const express = require('express');
const router = express.Router();
const { 
  addFavoriteMovie,
  removeFavoriteMovie,
  getFavoriteMovies,
  checkFavoriteMovie
} = require('../controllers/favoriteMovieController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', addFavoriteMovie);
router.delete('/:movieId', removeFavoriteMovie);
router.get('/', getFavoriteMovies);
router.get('/check/:movieId', checkFavoriteMovie);

module.exports = router;