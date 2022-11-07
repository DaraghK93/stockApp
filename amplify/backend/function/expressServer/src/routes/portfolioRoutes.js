const express = require("express")
const router = express.Router()
const { createPortfolio } = require('../controllers/portfolioController')
const {protectedRoute} = require('../middleware/authMiddleware');

router.post('/createPortfolio', protectedRoute, createPortfolio)

module.exports = router