const Book = require('../models/Book')
const UserBooks = require('../models/UserBooks');
const httpError = require('../utils/httpError');

async function getMyBooks(req, res){
    const links = await UserBooks.find({user: req.userId}).populate('book');
    res.json(links);
}

async function removeBook (req, res){
    const bookId = req.params.bookId;
    const userId = req.userId;
    const deleted = await UserBooks.findOneAndDelete({book: bookId, user: userId});
    if(!deleted)
        throw httpError(404, 'Failed to delete the book');
    res.status(200).json(deleted);
}

async function addBook (req, res){
    const book = await Book.findById(req.params.bookId);
    if(!book)
        throw httpError(404, 'Book doesnt exist');
    const link = await UserBooks.create({user: req.userId, book: book._id});
    res.status(201).json(link);
}


module.exports = {addBook, getMyBooks, removeBook};