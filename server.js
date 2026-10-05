const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const booksRouter = require ('./routes/books');
const authRouter = require ('./routes/auth');
const userBooksRouter = require ('./routes/userBooks');

connectDB();

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/books', booksRouter);
app.use('/', authRouter);
app.use('/me', userBooksRouter);
app.use(errorHandler);

app.listen(3000, ()=>{
    console.log("Hosted on http://localhost:3000");
})
