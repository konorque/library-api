import mongoose from 'mongoose';

interface IUserBooks {user:mongoose.Types.ObjectId, book:mongoose.Types.ObjectId};

const userBooksSchema = new mongoose.Schema<IUserBooks>({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true}
});

userBooksSchema.index({user: 1, book: 1}, {unique: true});

export = mongoose.model<IUserBooks>('UserBooks', userBooksSchema);