const express = require("express")
const router = express.Router()
const { createHangingPortfolio, buyStock } = require('../controllers/portfolioController')
const {protectedRoute} = require('../middleware/authMiddleware');

router.post('/createPortfolio', protectedRoute, createHangingPortfolio)
router.post('/buyStock', protectedRoute, buyStock)

module.exports = router