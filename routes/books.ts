import express from 'express';
import controller from'../controllers/bookController';
import auth from'../middleware/auth';

const router = express.Router();

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);
router.post('/', auth, controller.createBook);

export = router;