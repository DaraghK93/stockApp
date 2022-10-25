const Stock = require('../models/stock.model');


/// Imports ///
const stockService = require('../services/stockRoutesServices')

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
    res.errormessage = 'Server error in getStockPrice';
    return next(err);
  }
};

// @route   GET api/stocks
// @desc    this route gets all stocks but uses aggregate queries to 
//          get particular objects related to what will be shown in front end
//          in a series of side scrolling menu components
// @access  Private - add auth middleware to make it private
const getAllStocks = async (req, res, next) => {
  const category = req.query.category;
  const keyword = req.query.keyword;   // This is the search term entered into the search box

// check if category is summary and if not, return all stocks, else 
// return the aggregate query for different stock categories

  if (category === 'usersearch') {
    try {
      // Regex/pattern matching across the below fields
      const stocks = await Stock.find({
        "$or": [
          { symbol: { '$regex': keyword, '$options': 'i' } },
          { longname: { '$regex': keyword, '$options': 'i' } },
          { shortname: { '$regex': keyword, '$options': 'i' } },
          { industry: { '$regex': keyword, '$options': 'i' } },
          { sector: { '$regex': keyword, '$options': 'i' } }
        ]
      // Sorts the results by symbol, this will change to marketcap (and eventually whatever the user enters), once the fields in the DB have been updated to numbers (currently strings) 
      }).sort({ symbol: 1 })
      res.json(stocks);
    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error in getAllStocks-sorting';
      return next(err);
    }
  }   
  else if (category === 'usersearch' && keyword === "all") {
    try {
      const stocks = await Stock.find().select({ prices: 0 });
      res.json(stocks);
    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error in getAllStocks';
      return next(err);
    }
  } 

  else {
  try {
    // aggregate query that uses $facet to run 3 queries and return all in
    // one response
        const stocks = await Stock.aggregate([
          { $facet: 
              // agg query for top environment
              { topEnvironment: [{$match :{}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                          'daily_change.absoluteChange':1,
                                                          'daily_change.percentageChange':1,
                                                          'daily_change.currentprice':1}},
              {$sort: {'esgrating.environment_score': -1}},
              { $limit: 20}], 
              // agg query for top social
                topSocial: [{$match :{}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                    'daily_change.absoluteChange':1,
                                                    'daily_change.percentageChange':1,
                                                    'daily_change.currentprice':1}},
                {$sort: {'esgrating.social_score': -1}},
              { $limit: 20}],
              // agg query for top governance
              topGovernance: [{$match :{}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                        'daily_change.absoluteChange':1,
                                                        'daily_change.percentageChange':1,
                                                        'daily_change.currentprice':1}},
              {$sort: {'esgrating.governance_score': -1}},
              { $limit: 20}],
              topGainers: [{$match :{}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                          'daily_change.absoluteChange':1,
                                                          'daily_change.percentageChange':1,
                                                          'daily_change.currentprice':1}},
              {$sort: {'daily_change.percentageChange': -1}},
              { $limit: 20}],
              topLosers: [{$match :{}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                    'daily_change.absoluteChange':1,
                                                    'daily_change.percentageChange':1,
                                                    'daily_change.currentprice':1}},
              {$sort: {'daily_change.percentageChange': 1}},
              { $limit: 20}]
            }
        }])
    res.json(stocks)
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error in getAllStocks aggregation';
    return next(err);
  }
}}

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
    res.errormessage = 'Server error in addStock';
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
    res.errormessage = 'Server error in updateStock';
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
    const stockPriceData = stockService.getStockPriceData(stocks)
    const oneWeek = stockPriceData[0]
    const oneMonth = stockPriceData[1]
    const oneYear = stockPriceData[2]
    // var stockjson = JSON.stringify(stocks)
    // stockjson.month = oneMonth
    // stocks[0]["month"] = oneMonth
    const returnStocks = {
      id: stocks[0]._id,
      idnumber: stocks[0].idnumber,
      exchange: stocks[0].exchange, 
      symbol: stocks[0].symbol, 
      shortname: stocks[0].shortname, 
      longname: stocks[0].longname, 
      sector: stocks[0].sector, 
      industry: stocks[0].industry, 
      marketcap: stocks[0].marketcap, 
      ebitda: stocks[0].ebitda, 
      revenuegrowth: stocks[0].revenuegrowth, 
      city: stocks[0].city, 
      state: stocks[0].state, 
      country: stocks[0].country, 
      longbusinesssummary: stocks[0].longbusinesssummary, 
      weight: stocks[0].weight, 
      esgrating: stocks[0].esgrating, 
      logo: stocks[0].logo, 
      daily_change: stocks[0].daily_change,
      week: oneWeek, 
      month: oneMonth,
      year: oneYear
    }
    // console.log(stocks)
    res.json(returnStocks);
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error in getStockBySymbol';
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
