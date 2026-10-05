const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true, minlength: [2, 'Too short username']},
    password: { type: String, required: true, select: false}
});

module.exports = mongoose.model('User', userSchema);