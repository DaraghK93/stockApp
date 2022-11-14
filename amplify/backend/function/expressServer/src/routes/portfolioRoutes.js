const express = require("express")
const router = express.Router()
const { createHangingPortfolio, buyStockMarketOrder } = require('../controllers/portfolioController')
const {protectedRoute} = require('../middleware/authMiddleware');

router.post('/createPortfolio', protectedRoute, createHangingPortfolio)
router.post('/buyStockMarketOrder', protectedRoute, buyStockMarketOrder)

module.exports = router