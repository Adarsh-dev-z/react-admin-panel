const { Router } = require("express");
const productController = require("../controllers/productController");

const router= Router()

router.get('/get-products', productController.getProducts);
router.post('/add-product', productController.addProduct);
router.post('/update-product', productController.updateProduct);
router.get('/product', productController.getProductById);
router.delete('/delete-product', productController.deleteProduct);