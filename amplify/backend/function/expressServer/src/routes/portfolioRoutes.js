const express = require("express")
const router = express.Router()
const { createHangingPortfolio, buyStockMarketOrder, sellStockMarketOrder,getMyGamesAndPortfolios } = require('../controllers/portfolioController')
const {protectedRoute} = require('../middleware/authMiddleware');

router.post('/createPortfolio', protectedRoute, createHangingPortfolio)
router.post('/buyStockMarketOrder', protectedRoute, buyStockMarketOrder)
router.post('/sellStock', protectedRoute, sellStockMarketOrder)
router.get('/myGamesAndPortfolios',protectedRoute,getMyGamesAndPortfolios)

module.exports = router