const express = require("express")
const router = express.Router()
const { createHangingPortfolio, buyStock, sellStock, getLeaguePortfolio } = require('../controllers/portfolioController')
const {protectedRoute} = require('../middleware/authMiddleware');

router.post('/createPortfolio', protectedRoute, createHangingPortfolio)
router.post('/buyStock', protectedRoute, buyStock)
router.post('/sellStock', protectedRoute, sellStock)
router.get('/:leagueId',protectedRoute,getLeaguePortfolio)


module.exports = router