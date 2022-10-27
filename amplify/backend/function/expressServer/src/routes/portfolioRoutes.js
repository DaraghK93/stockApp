const express = require("express")
const router = express.Router()
const { createPortfolio } = require('../controllers/portfolioController')
const auth = require('../middleware/authMiddleware');

router.post('/createPortfolio', auth, createPortfolio)

module.exports = router