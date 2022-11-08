const express = require("express")
const router = express.Router()
const { createHangingPortfolio } = require('../controllers/portfolioController')
const {protectedRoute} = require('../middleware/authMiddleware');

router.post('/createPortfolio', protectedRoute, createHangingPortfolio)

module.exports = router