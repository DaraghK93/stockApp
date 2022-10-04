const express = require("express")
const router = express.Router()
const { getStockPrice, updateStock, addStock, getAllStocks } = require('../controllers/stockController')


// maybe change name to ticker symbol instead

router.get('/price/:name', getStockPrice)
router.put('/updateStock/:name', updateStock)
router.post('/addStock/', addStock)
router.get('/', getAllStocks)

module.exports = router
