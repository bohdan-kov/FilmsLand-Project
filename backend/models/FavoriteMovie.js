const mongoose = require('mongoose');

const favoriteMovieSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: { type: String, required: true },
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  rating: { type: Number, required: true },
  posterUrl: { type: String, required: true }
}, { timestamps: true });

favoriteMovieSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('FavoriteMovie', favoriteMovieSchema);