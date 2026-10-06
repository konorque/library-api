const express = require('express');
const controller = require('../controllers/bookController');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);
router.post('/', auth, controller.createBook);


module.exports = router;