const express = require("express")
const router = express.Router()
const { getStockPrice, updateStock, addStock, getAllStocks, getStockBySymbol } = require('../controllers/stockController');
const { errorHandler } = require("../middleware/errorMiddleware");

// maybe change name to ticker symbol instead

// get stock price for a given stock
router.get('/price/:symbol' ,getStockPrice)
// updates a stock given ticker symbol (price for now)
router.put('/updateStock/:symbol', updateStock)
// adds a new stock to the db (this is for testing)
router.post('/addStock/', addStock)
// returns all stocks
router.get('/', getAllStocks)
// search stock by ticker symbol
router.get('/:symbol', getStockBySymbol)


module.exports = router;
