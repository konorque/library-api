import express from 'express';
import errorHandler from './middleware/errorHandler';
import booksRouter from './routes/books';
import authRouter from './routes/auth';
import userBooksRouter from './routes/userBooks';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many requests, try again later' }
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: { error: 'Too many login attempts, try again later' }
});

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use('/login', loginLimiter);
app.use(globalLimiter);
app.use(express.json());
app.use('/books', booksRouter);
app.use('/', authRouter);
app.use('/me', userBooksRouter);
app.use(errorHandler);

export = app;