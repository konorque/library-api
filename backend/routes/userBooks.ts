import express from 'express';
import auth from '../middleware/auth';
import controller from'../controllers/userBooksController';

const router = express.Router();

router.get('/books', auth, controller.getMyBooks);
router.post('/books/:bookId', auth, controller.addBook);
router.delete('/books/:bookId', auth, controller.removeBook);

export = router;