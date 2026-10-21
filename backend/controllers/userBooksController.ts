import Book from '../models/Book';
import UserBooks from '../models/UserBooks';
import httpError from '../utils/httpError';
import type { AuthRequest } from '../types/authRequest';
import type { Response } from 'express';

async function getMyBooks(req:AuthRequest, res:Response){
    const userId = req.userId;
    if(!userId)
        throw httpError(401, 'User not found');
    const links = await UserBooks.find({user: userId}).populate('book');
    res.json(links);
}

async function removeBook (req:AuthRequest, res:Response){
    const bookId = req.params.bookId;
    if(!bookId)
        throw httpError(400, 'Wrong book ID');
    const userId = req.userId;
    if(!userId)
        throw httpError(401, 'User not found');
    const deleted = await UserBooks.findOneAndDelete({book: bookId, user: userId});
    if(!deleted)
        throw httpError(404, 'Failed to delete the book');
    res.status(200).json(deleted);
}

async function addBook (req:AuthRequest, res:Response){
    const book = await Book.findById(req.params.bookId);
    if(!book)
        throw httpError(404, 'Book doesnt exist');
    const userId = req.userId;
    if(!userId)
        throw httpError(401, 'User not found');
    const link = await UserBooks.create({user: userId, book: book._id});
    res.status(201).json(link);
}

export = {addBook, getMyBooks, removeBook};