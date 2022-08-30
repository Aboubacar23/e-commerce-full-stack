const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const productMulter = require('../middlewares/multer.config')

router.get('/', ProductController.getAllProducts);
router.post('/add', productMulter, ProductController.newProduct);
router.get('/:id', ProductController.getByIdProduct);
router.put('/:id', productMulter, ProductController.updateProduct);
router.delete('/:id', ProductController.deleteOneProduct);

module.exports = router;