const express = require("express")
const router = express.Router()
const { createHangingPortfolio, buyStockMarketOrder, sellStockMarketOrder, getLeaguePortfolio } = require('../controllers/portfolioController')
const {protectedRoute} = require('../middleware/authMiddleware');

router.post('/createPortfolio', protectedRoute, createHangingPortfolio)
router.post('/buyStockMarketOrder', protectedRoute, buyStockMarketOrder)
router.post('/sellStock', protectedRoute, sellStockMarketOrder)
router.get('/:userId/:leagueId',protectedRoute,getLeaguePortfolio)


module.exports = router