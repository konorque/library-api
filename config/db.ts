import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function connectDB():Promise<void> {
    try {
        const mongodbUri = process.env.MONGODB_URI;
        if(!mongodbUri){
            console.error('Ошибка подключения к MongoDB: MONGODB_URI not set');
            process.exit(1);
        }
        await mongoose.connect(mongodbUri);
        console.log('MongoDB подключена');
    } catch (err) {
    console.error('Ошибка подключения к MongoDB:', err);
    process.exit(1);
    }
}

export = connectDB;
