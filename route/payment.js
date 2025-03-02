const express = require('express');
const { paymentProcess, sendStripe } = require('../controller/paymentCntrl');
const routers = express.Router()


routers.route('/payment').post(paymentProcess)
routers.route('/stripe').get(sendStripe)

module.exports = routers;  