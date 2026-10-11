import mongoose from 'mongoose';

interface IBook {title:string, author:string};

const bookSchema = new mongoose.Schema<IBook>({
    title: { type: String, required: true, trim: true, minlength: [2, 'Too short book name'] },
    author: { type: String, required: true, trim: true, minlength: [2, 'Too short author name']  }
});

module.exports = mongoose.model<IBook>('Book', bookSchema);
