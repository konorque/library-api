const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const controller = require('../controllers/userBooksController');

router.get('/books', auth, controller.getMyBooks);
router.post('/books/:bookId', auth, controller.addBook);

module.exports = router;