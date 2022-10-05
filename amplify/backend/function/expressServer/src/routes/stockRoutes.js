const express = require("express")
const router = express.Router()
const { getStockPrice, updateStock, addStock, getAllStocks } = require('../controllers/stockController')


// maybe change name to ticker symbol instead

router.get('/price/:symbol', getStockPrice)
router.put('/updateStock/:symbol', updateStock)
router.post('/addStock/', addStock)
router.get('/', getAllStocks)

module.exports = router
