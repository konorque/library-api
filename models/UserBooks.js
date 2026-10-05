const mongoose = require('mongoose');

const userBooksSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true}
});

userBooksSchema.index({user: 1, book: 1}, {unique: true});

module.exports = mongoose.model('UserBooks', userBooksSchema);