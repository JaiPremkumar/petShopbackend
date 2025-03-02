const express = require('express')
const { getOrder, createOrder, singleOrder, myOrder } = require('../controller/orderCntrl')
const router = express.Router()

router.route('/order').get(getOrder)
router.route('/order').post(createOrder)
router.route('/order/:id').get(singleOrder)
router.route('/myorder').get(myOrder)

module.exports = router;
