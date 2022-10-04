const express = require("express")
const router = express.Router()
const { getStockPrice } = require('../controllers/stockController')


// maybe change name to ticker symbol instead

router.get('/price/:name', getStockPrice)


module.exports = router
