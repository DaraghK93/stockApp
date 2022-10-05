const { compileString } = require('sass');
const Stock = require('../models/stock.model');


// @desc get individual stock price
// @route GET /api/stock/price/:name
// @access Public

const getStockPrice = async (req,res) => {
    try {
        console.log(req.params.symbol);
        
        const stock = await Stock.find({symbol: req.params.symbol});
        
        if (!stock.length){
            return res.status(404).json({msg: 'Stock not found'});
        }

        res.json(stock[0].currentprice);
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
}

// @route   GET api/stocks
// @desc    Get all stocks
// @access  Private - add auth middleware to make it private
const getAllStocks = async (req,res) =>{
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc Add new stock data
// @route POST /api/stock/addStock/
// @access Public

const addStock = async (req,res) => {
    try {
        console.log(req.params.symbol);
        
        const newStock = new Stock({
            symbol: req.body.symbol,
            currentprice: req.body.currentprice
        });

        const stock = await newStock.save();

        res.json({ stock }) 
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
}



// @desc Update a stock. Price only at the minute but whatever else can be added
// @route PUT /api/stock/updatestock/:name
// @access Private

const updateStock = async (req,res) => {
    try{
        // Get the stock from db
        const stock = await Stock.find({symbol: req.params.symbol})
        
        console.log(stock[0].currentprice);
        console.log(req.body.currentprice);
        const price = req.body.currentprice

        // price must be greater than 0
        if (price <= 0){
            return res.status(404).json({msg: 'Price not found'});

        }

        stock[0].currentprice = req.body.currentprice;

        await stock[0].save();

        res.json(stock);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


module.exports = {
    getStockPrice, updateStock, addStock, getAllStocks
} 
