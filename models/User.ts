import mongoose from 'mongoose';

interface IUser {username:string, password:string};

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, unique: true, required: true, trim: true, minlength: [2, 'Too short username']},
    password: { type: String, required: true, select: false}
});

module.exports = mongoose.model<IUser>('User', userSchema);