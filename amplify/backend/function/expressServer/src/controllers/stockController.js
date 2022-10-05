const { compileString } = require('sass');
const Stock = require('../models/stock.model');

// @desc get individual stock price
// @route GET /api/stock/price/:name
// @access Public

const getStockPrice = async (req, res, next) => {
  try {
    const stock = await Stock.find({ symbol: req.params.symbol });

    if (!stock.length) {
      // No stock found
      res.status(404);
      res.errormessage = 'Stock not found';
      return next(new Error('Stock not found'));
    }

    res.json(stock[0].currentprice);
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
};

// @route   GET api/stocks
// @desc    Get all stocks
// @access  Private - add auth middleware to make it private
const getAllStocks = async (req, res,next) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
};

// @desc Add new stock data
// @route POST /api/stock/addStock/
// @access Public

const addStock = async (req, res,next) => {
  try {
    const newStock = new Stock({
      symbol: req.body.symbol,
      currentprice: req.body.currentprice,
    });

    const stock = await newStock.save();

    res.json({ stock });
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
};

// @desc Update a stock. Price only at the minute but whatever else can be added
// @route PUT /api/stock/updatestock/:name
// @access Private

const updateStock = async (req, res,next) => {
  try {
    // Get the stock from db
    const stock = await Stock.find({ symbol: req.params.symbol });

    const price = req.body.currentprice;

    // price must be greater than 0
    if (price <= 0) {
      res.status(404);
      res.errormessage = 'Price not found';
      return next(new Error('Price not found'));
    }

    stock[0].currentprice = req.body.currentprice;

    await stock[0].save();

    res.json(stock);
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
};

// @route   GET api/stocks/:symbol
// @desc    Get stock by sybmol
// @access  Private - add auth middleware to make it private
const getStockBySymbol = async (req, res, next) => {
  try {
    const stocks = await Stock.find({ symbol: req.params.symbol });

    if (!stocks.length) {
      // No stock found
      res.status(404);
      res.errormessage = 'Stock not found';
      return next(new Error('Stock not found'));
    }
    res.json(stocks);
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
};

module.exports = {
  getStockPrice,
  updateStock,
  addStock,
  getAllStocks,
  getStockBySymbol,
};
