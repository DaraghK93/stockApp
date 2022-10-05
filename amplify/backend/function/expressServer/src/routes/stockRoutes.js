const express = require("express")
const router = express.Router()
const { getStockPrice, updateStock, addStock, getAllStocks, getStockBySymbol } = require('../controllers/stockController');
const { errorHandler } = require("../middleware/errorMiddleware");

// maybe change name to ticker symbol instead

router.get('/price/:symbol' ,getStockPrice)
router.put('/updateStock/:symbol', updateStock)
router.post('/addStock/', addStock)
router.get('/', getAllStocks)
router.get('/:symbol', getStockBySymbol)


module.exports = router;
