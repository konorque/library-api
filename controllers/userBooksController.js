const Book = require('../models/Book')
const UserBooks = require('../models/UserBooks');

async function getMyBooks(req, res){
    const links = await UserBooks.find({user: req.userId}).populate('book');
    res.json(links);
}

async function addBook (req, res){
    const book = await Book.findById(req.params.bookId);
    if(!book)
        return res.status(404).json({error: 'Not found'});
    const link = await UserBooks.create({user: req.userId, book: book._id});
    res.status(201).json(link);
}


module.exports = {addBook, getMyBooks};