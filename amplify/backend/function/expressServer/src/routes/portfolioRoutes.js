const express = require("express")
const router = express.Router()
const { createHangingPortfolio, buyStock, sellStock, getLeaguePortfolio,getMyGamesAndPortfolios, cancelLimitOrder } = require('../controllers/portfolioController')
const {protectedRoute} = require('../middleware/authMiddleware');

router.post('/createPortfolio', protectedRoute, createHangingPortfolio)
router.post('/buyStock', protectedRoute, buyStock)
router.post('/sellStock', protectedRoute, sellStock)
router.get('/myGamesAndPortfolios',protectedRoute,getMyGamesAndPortfolios)
router.get('/:leagueId',protectedRoute,getLeaguePortfolio)
router.post('/cancelLimitOrder',protectedRoute,cancelLimitOrder)

module.exports = router