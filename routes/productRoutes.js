const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
  createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
} = require('../controllers/productController');

const router = express.Router();

router.post('/create', auth, createProduct);
router.get('/readall', getAllProducts);
router.get('/readone/:id', getProductById);
router.put('/update/:id', auth, updateProduct);
router.delete('/delete/:id', auth, deleteProduct);

module.exports = router;
