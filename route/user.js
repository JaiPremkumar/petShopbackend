const express = require('express')
const { register, login, getAllUser, updateUser, getUser, logOut } = require('../controller/userCntrl')
const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/alluser').post(getAllUser)
router.route('/update').post(updateUser)
router.route('/myDp').post(getUser)
router.route('/logout').post(logOut)

module.exports = router