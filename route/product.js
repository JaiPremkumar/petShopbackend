const express = require('express')
const { getProducts, newProduct, updateProduct, singleProduct } = require('../controller/productCntrl')
const router = express.Router()

router.route('/products').get(getProducts)
router.route('/product/new').post(newProduct)
router.route('/product/:id').get(singleProduct)


module.exports = router