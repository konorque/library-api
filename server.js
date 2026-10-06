const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const booksRouter = require ('./routes/books');
const authRouter = require ('./routes/auth');
const userBooksRouter = require ('./routes/userBooks');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

connectDB();

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
app.use(express.static('public'));
app.use('/books', booksRouter);
app.use('/', authRouter);
app.use('/me', userBooksRouter);
app.use(errorHandler);

app.listen(3000, ()=>{
    console.log("Hosted on http://localhost:3000");
})
