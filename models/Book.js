const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, minlength: [2, 'Too short book name'] },
    author: { type: String, required: true, trim: true, minlength: [2, 'Too short author name']  }
});

module.exports = mongoose.model('Book', bookSchema);
