const Stock = require('../models/stock.model');
var moment = require('moment')

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

    res.json(stock[0].prices);
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
};

// @route   GET api/stock
// @desc    Get all stocks
// @access  Private - add auth middleware to make it private
const getAllStocks = async (req, res, next) => {
  try {
    const stocks = await Stock.find().select({prices: 0});
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

const addStock = async (req, res, next) => {
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

const updateStock = async (req, res, next) => {
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

// @route   GET api/oneMonthStockData/:symbol
// @desc    Get stock information for the entire
// @access  Private - add auth middleware to make it private
const getOneMonthStockData = async (req, res, next) => {
  try {
    const stock = await Stock.find({ symbol: req.params.symbol });
    const monthly_prices = stock[0].prices
    if (!stock.length) {
      // No stock found
      res.status(404);
      res.errormessage = 'Stock not found';
      return next(new Error('Stock not found'));
    }
    // Use moment - npm i 
    const end_Date = moment( moment().subtract(1, 'month') ).format("YYYY-MM-DD")

    // code taken from Borislav Hadzhiev
    // https://bobbyhadz.com/blog/javascript-get-all-dates-between-two-dates#:~:text=To%20get%20all%20of%20the%20dates%20between%202%20dates%3A&text=Copied!,(date))%3B%20date. 
    function getDatesInRange(startDate, endDate) {
      // the below function will create an array of dates from today back one month
      const date = new Date(startDate.getTime());
    
      const dates = [];
    
      while (date <= endDate) {
        new_Date = new Date(date)
        // the three lines below will put the dates in the format needed to extract the data
        var year = new_Date.toLocaleString("default", { year: "numeric" });
        var month = new_Date.toLocaleString("default", { month: "2-digit" });
        var day = new_Date.toLocaleString("default", { day: "2-digit" });
        // the date will be added to the array using .push()
        dates.push(year + "-" + month + "-" + day);
        date.setDate(date.getDate() + 1);
      }
      return dates;
    }
    // Date() gives us the current date, Date(end_Date) interprets the 
    // input date and creates a date that can be used in the function
    const d1 = new Date(end_Date);
    const d2 = new Date();
    
    // run the function to get the range of dates
    date_range = getDatesInRange(d1, d2);

    // create an object for the prices (similar to python dictionary)
    const prices_month = []

    // loop through the date range list and extract the data
    for (var i = 0; i < date_range.length; i++) { 
      // the format of the data keys is "YYYY-MM-DDT20:00:00"
      if(typeof(monthly_prices[date_range[i]+"T20:00:00"]) != 'undefined'){
        prices_month.push({"date": date_range[i], "price": monthly_prices[date_range[i]+"T20:00:00"]["4. close"] })}}
    res.json(prices_month);
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
};


// @route   GET api/oneYearStockData/:symbol
// @desc    Get one year stock prices for a specific stock
// @access  Private - add auth middleware to make it private
const getOneYearStockData = async (req, res, next) => {
  try {
    const stock = await Stock.find({ symbol: req.params.symbol });
    const yearly_prices = stock[0].prices
    if (!stock.length) {
      // No stock found
      res.status(404);
      res.errormessage = 'Stock not found';
      return next(new Error('Stock not found'));
    }

    // Use moment - npm i
    const end_Date = moment( moment().subtract(1, 'year') ).format("YYYY-MM-DD")

    // code taken from Borislav Hadzhiev
    // https://bobbyhadz.com/blog/javascript-get-all-dates-between-two-dates#:~:text=To%20get%20all%20of%20the%20dates%20between%202%20dates%3A&text=Copied!,(date))%3B%20date. 
    function getDatesInRange(startDate, endDate) {
      // the below function will create an array of dates from today back one month
      const date = new Date(startDate.getTime());
    
      const dates = [];
      
      while (date <= endDate) {
        new_Date = new Date(date)
        // the three lines below will put the dates in the format needed to extract the data
        var year = new_Date.toLocaleString("default", { year: "numeric" });
        var month = new_Date.toLocaleString("default", { month: "2-digit" });
        var day = new_Date.toLocaleString("default", { day: "2-digit" });
        // the date will be added to the array using .push()
        dates.push(year + "-" + month + "-" + day);
        date.setDate(date.getDate() + 1);
      }
    
      return dates;
    }
    
    // Date() gives us the current date, Date(end_Date) interprets the 
    // input date and creates a date that can be used in the function
    const d1 = new Date(end_Date);
    const d2 = new Date();
    
    // run the function to get the range of dates
    date_range = getDatesInRange(d1, d2);

    // create an object for the prices (similar to python dictionary)
    const prices_year = []

    // loop through the date range list and extract the data
    for (var i = 0; i < date_range.length; i++) { 
      // the format of the data keys is "YYYY-MM-DDT20:00:00"
      if(typeof(yearly_prices[date_range[i]+"T20:00:00"]) != 'undefined'){
        prices_year.push({"date": date_range[i], "price": yearly_prices[date_range[i]+"T20:00:00"]["4. close"] })}}
    res.json(prices_year);
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
  getOneMonthStockData,
  getOneYearStockData,
};
