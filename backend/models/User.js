const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  photo: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('User', userSchema);