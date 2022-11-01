const express = require("express")
const router = express.Router()
const { createOrder} = require('../controllers/orderController')
// const auth = require('../middleware/authMiddleware');

router.post('/', createOrder )

module.exports = router