const express = require("express")
const router = express.Router()
const { createOrder, getOrders} = require('../controllers/orderController')
// const auth = require('../middleware/authMiddleware');

router.post('/', createOrder )
router.get('/', getOrders)

module.exports = router