const express = require('express');
const controller = require('../controllers/bookController');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);
router.post('/', auth, controller.createBook);
router.delete('/:id', auth, controller.deleteBook);
router.put('/:id', auth, controller.updateBook);

module.exports = router;