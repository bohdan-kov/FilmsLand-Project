const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getProfile, 
  uploadPhoto, 
  getPhoto
} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registration', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.post('/upload-photo', authMiddleware, uploadPhoto);
router.get('/photo', authMiddleware, getPhoto);

module.exports = router;