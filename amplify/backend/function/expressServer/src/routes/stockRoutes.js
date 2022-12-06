const express = require("express")
const router = express.Router()
const { getStockPrice, updateStock, addStock, getAllStocks, getStockBySymbol, getGameStocks, testAll} = require('../controllers/stockController');
const { errorHandler } = require("../middleware/errorMiddleware");
const {protectedRoute} = require('../middleware/authMiddleware');


// maybe change name to ticker symbol instead

// get stock price for a given stock
router.get('/price/:symbol' ,getStockPrice)
// updates a stock given ticker symbol (price for now)
router.put('/updateStock/:symbol', updateStock)
// adds a new stock to the db (this is for testing)
router.post('/addStock/', addStock)
// returns all stocks
router.get('/', protectedRoute, getAllStocks)
// search stock by ticker symbol. This will give all data except prices for that ticker
router.get('/:symbol', getStockBySymbol)
// get the stocks playable in a game
router.get('/gameStocks/game', getGameStocks)

// get all stocks for testing
router.post('/test/route', protectedRoute, testAll)


module.exports = router;
