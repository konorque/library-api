const Book = require('../models/Book');

async function getAllBooks (req, res) {
        const books = await Book.find();
        res.json(books);
}

async function getBookById (req, res) {
        const book = await Book.findById(req.params.id);
        if (!book)
            return res.status(404).json({ error: 'Not found' });
        res.json(book);
}

async function createBook(req, res) {
        if (!req.body.title || !req.body.author)
            return res.status(400).json({ error: 'Fields are empty' });

        const newBook = await Book.create({ title: req.body.title, author: req.body.author });
        res.status(201).json(newBook);
}

// async function deleteBook (req, res) {
//         const deleted = await Book.findByIdAndDelete(req.params.id);
//         if(!deleted)
//             return res.status(404).json({ error: 'Not found' });
//         res.status(200).json({success: 'Object deleted successfully'})
// }

// async function updateBook (req, res) {
//         const updated = await Book.findByIdAndUpdate(req.params.id, { title: req.body.title, author: req.body.author }, { new: true, runValidators: true });
//         if(!updated)
//             return res.status(404).json({ error: 'Not found' });
//         res.status(200).json(updated);
// }

module.exports = {getAllBooks, getBookById, createBook};// deleteBook, updateBook