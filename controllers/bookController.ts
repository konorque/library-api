import Book from'../models/Book';
import httpError from'../utils/httpError';
import type { Request, Response } from 'express';

async function getAllBooks (req:Request, res:Response) {
        const books = await Book.find();
        res.json(books);
}

async function getBookById (req:Request, res:Response) {
        const book = await Book.findById(req.params.id);
        if (!book)
            throw httpError(404, 'Not found');
        res.json(book);
}

async function createBook(req:Request, res:Response) {
        if (!req.body.title || !req.body.author)
            throw httpError(400, 'Fields are empty');

        const newBook = await Book.create({ title: req.body.title, author: req.body.author });
        res.status(201).json(newBook);
}

export = {getAllBooks, getBookById, createBook};