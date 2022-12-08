const Stock = require('../models/stock.model');
const User = require('../models/user.model');


/// Imports ///
const stockService = require('../services/stockRoutesServices')
const articleService = require('../services/articleService');
const twitterService = require('../services/twitterService');

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
    res.status(500)
    res.errormessage = 'Server error in get Stock Price';
    return next(err);
  }
};

// @route   GET api/stocks
// @desc    this route gets all stocks but uses aggregate queries to 
//          get particular objects related to what will be shown in front end
//          in a series of side scrolling menu components
// @access  Private - add auth middleware to make it private
const getAllStocks = async (req, res, next) => {
     // This is the search term entered into the search box

// check if category is summary and if not, return all stocks, else 
// return the aggregate query for different stock categories
  try{
    /// keyword is query param 
    const keyword = req.query.keyword;

    /// if undefined return the stock summary 
    if(keyword == "undefined"){     
      // Create the input for the recommender system API, save the output as recs
      let userID = req.user.id
      let recommendData = await stockService.getRecomms(userID)
      let recs = recommendData.data.message
      
      // Keyword undefied just return the top stocks, also feed in recs to function
      const stocks = await stockService.getStockSummary(Stock, recs)
      res.json(stocks)
    }else{ 
      // Keyword defined search for the stocks 
       const stocks = await Stock.find({
        "$or": [
          { symbol: { '$regex': keyword, '$options': 'i' } },
          { longname: { '$regex': keyword, '$options': 'i' } },
          { shortname: { '$regex': keyword, '$options': 'i' } },
          { industry: { '$regex': keyword, '$options': 'i' } },
          { sector: { '$regex': keyword, '$options': 'i' } }
        ]
      // Sorts the results by symbol, this will change to marketcap (and eventually whatever the user enters), once the fields in the DB have been updated to numbers (currently strings) 
      }).select({prices:0})
      res.json(stocks);
    }
  }catch(err){
    console.error(err.message);
    res.status(500)
    res.errormessage = 'Server error in get All Stocks';
    return next(err);
  }
}

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
    res.status(500)
    res.errormessage = 'Server error in add Stock';
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
    res.status(500)
    res.errormessage = 'Server error in update Stock';
    return next(err);
  }
};

// @route   GET api/stocks/:symbol
// @desc    Get stock by sybmol
// @access  Private - add auth middleware to make it private
const getStockBySymbol = async (req, res, next) => {
  try {
    /// Get the stock object 
    const stocks = await Stock.find({ symbol: req.params.symbol });
    if (!stocks.length) {
      // No stock found
      res.status(404);
      res.errormessage = 'Stock not found';
      return next(new Error('Stock not found'));
    }
    /// Get the price breakdown 
    const stockPriceData = stockService.getStockPriceData(stocks)
    const oneWeek = stockPriceData[0]
    const oneMonth = stockPriceData[1]
    const oneYear = stockPriceData[2]
    /// Get the search query for news articles
    const newsQuery = await articleService.buildSearchQueryForCompany(stocks[0].shortname,stocks[0].longname, stocks[0].symbol )
    /// Execute the query to get the articles 
    const newsSentiment = await articleService.getCompanySentimentCount(newsQuery)
    /// Get twitter sentiment counts
    const twitterSentiment = await twitterService.getCompanySentimentCount(stocks[0].symbol);
    /// Return stock data 
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
      newsSentiment:newsSentiment,
      twitterSentiment:twitterSentiment,
      week: oneWeek, 
      month: oneMonth,
      year: oneYear
    }
    res.json(returnStocks);
  } catch (err) {
    console.error(err.message);
    res.status(500)
    res.errormessage = 'Server error in get Stock By Symbol';
    return next(err);
  }
};

// @route   GET api/stocks/gameStocks/game
// @desc    Get stocks that are playable in a game
// @access  Private - add auth middleware to make it private
const getGameStocks = async (req, res, next) => {
  try{
    // check that all of the data is there
    if (
      typeof req.body.sectors === 'undefined' ||
      typeof req.body.minERating === 'undefined'||
      typeof req.body.minSRating === 'undefined'||
      typeof req.body.minGRating === 'undefined'
    ) {
      // data is missing bad request
      res.status(400)
      res.errormessage = 'Details missing for getting game stocks'
      return next(
        new Error(
          'The client has not sent the required information to get game stocks',
        ),
      )
    }

    // check if sectors are correct
    const sectorArray = ['Basic Materials',
    'Communication Services',
    'Consumer Cyclical',
    'Consumer Defensive',
    'Energy',
    'Financial Services',
    'Healthcare',
    'Industrials',
    'Real Estate',
    'Technology',
    'Utilities']

    const sectorsCheck = req.body.sectors;

    if(sectorsCheck.length === 0){
      // Invalid sector bad request
      res.status(400)
      res.errormessage = 'No sector included'
      return next(
        new Error(
          'No sector included',
        ),
      )
    } 

    for (const element of sectorsCheck) {
      if (!sectorArray.includes(element)) {
        res.status(400);
        res.errormessage = 'Invalid sector entered';
        return next(new Error('Invalid sector entered'));
      }
    }

    // check if esg ratings are correct
    if (
      !Number.isInteger(req.body.minERating) ||
      !Number.isInteger(req.body.minSRating) ||
      !Number.isInteger(req.body.minGRating) ||
      req.body.minERating < 0 ||
      req.body.minSRating < 0 ||
      req.body.minGRating < 0 ||
      req.body.minERating > 1000 ||
      req.body.minSRating > 1000 ||
      req.body.minGRating > 1000
    ) {
            // Invalid sector bad request
            res.status(400)
            res.errormessage = 'Invalid esg rating entered'
            return next(
              new Error(
                'Invalid esg rating entered',
              ),
            )
    }
        
    const type = req.params.type;
    let gameStocks;
    const {sectors,minERating,minSRating,minGRating} = req.body
    
    if (type === 'summary'){
      // the game rules are sent in the request body
      // this might need to be changed but is ok for now
      // this gets the game summary
      gameStocks = await stockService.gameStockSummary(sectors,minERating,minSRating,minGRating)
    }
    else if (type === 'all'){
      //hardcoding 20 per page for all stocks at the minute can change if needed
      const stocksPerPage = 20;
      let pageNumber = req.body.pageNumber;
      // if no page number included only show the first page
      if(!pageNumber){
        pageNumber =0
      }
      gameStocks = await stockService.getAllGameStocks(sectors,minERating,minSRating,minGRating,pageNumber,stocksPerPage);
    }
    else{
      // No stock found
      res.status(400);
      res.errormessage = 'Invalid param entered';
      return next(new Error('Invalid param entered'));
    }
    
    // put the find all stocks here and pass the game rules to it
    // there will be an if statement that checks req.query and if it's 
    // keyword = all it finds all, or keyword = summary it gets the summary

    if (gameStocks.length === 0) {
      // No stock found
      res.status(404);
      res.errormessage = 'No stocks found for this game';
      return next(new Error('No stocks found for this game'));
    }
    res.json(gameStocks)
  } catch (err) {
    console.error(err.message);
    res.status(500)
    res.errormessage = 'Server error in get game stocks';
    return next(err);
  }
}


// @route   GET api/stocks
// @desc    Searches for stocks suitable for a given game by keyword
// @access  Private - add auth middleware to make it private
const getAllGameStocks = async (req, res, next) => {
  // This is the search term entered into the search box

// check if category is summary and if not, return all stocks, else 
// return the aggregate query for different stock categories
try{
  // check that all of the data is there
  if (
    typeof req.body.sectors === 'undefined' ||
    typeof req.body.minERating === 'undefined' ||
    typeof req.body.minSRating === 'undefined' ||
    typeof req.body.minGRating === 'undefined'
  ) {
    // data is missing bad request
    res.status(400);
    res.errormessage = 'Details missing for searching game stocks';
    return next(
      new Error(
        'The client has not sent the required information to search game stocks'
      )
    );
  }

  // check if sectors are correct
  const sectorArray = ['Basic Materials',
  'Communication Services',
  'Consumer Cyclical',
  'Consumer Defensive',
  'Energy',
  'Financial Services',
  'Healthcare',
  'Industrials',
  'Real Estate',
  'Technology',
  'Utilities']

  const sectorsCheck = req.body.sectors;

  if(sectorsCheck.length === 0){
    // Invalid sector bad request
    res.status(400)
    res.errormessage = 'No sector included'
    return next(
      new Error(
        'No sector included',
      ),
    )
  } 

  for (const element of sectorsCheck) {
    if (!sectorArray.includes(element)) {
      res.status(400);
      res.errormessage = 'Invalid sector entered';
      return next(new Error('Invalid sector entered'));
    }
  }

  // check if esg ratings are correct
  if (
    !Number.isInteger(req.body.minERating) ||
    !Number.isInteger(req.body.minSRating) ||
    !Number.isInteger(req.body.minGRating) ||
    req.body.minERating < 0 ||
    req.body.minSRating < 0 ||
    req.body.minGRating < 0 ||
    req.body.minERating > 1000 ||
    req.body.minSRating > 1000 ||
    req.body.minGRating > 1000
  ) {
          // Invalid sector bad request
          res.status(400)
          res.errormessage = 'Invalid esg rating entered'
          return next(
            new Error(
              'Invalid esg rating entered',
            ),
          )
  }

  /// keyword is query param
  let keyword = req.params.keyword;

  const minERating = req.body.minERating;
  const minSRating = req.body.minSRating;
  const minGRating = req.body.minGRating;
  const sectors = req.body.sectors;

  /// if undefined return the stock summary
  if (keyword == 'undefined') {
  } else {
    // Keyword defined search for the stocks
    const stocks = await Stock.find({
      $and: [
        {
          $or: [
            { symbol: { $regex: keyword, $options: 'i' } },
            { longname: { $regex: keyword, $options: 'i' } },
            { shortname: { $regex: keyword, $options: 'i' } },
            { industry: { $regex: keyword, $options: 'i' } },
            { sector: { $regex: keyword, $options: 'i' } },
          ],
          // Sorts the results by symbol, this will change to marketcap (and eventually whatever the user enters), once the fields in the DB have been updated to numbers (currently strings)
        },

        { 'esgrating.environment_score': { $gte: minERating } },
        { 'esgrating.social_score': { $gte: minSRating } },
        { 'esgrating.governance_score': { $gte: minGRating } },
        { sector: { $in: sectors } },
      ],
    }).select({ prices: 0 });
    res.json(stocks);
  }
} catch(err){
 console.error(err.message);
 res.status(500)
 res.errormessage = 'Server error in get All Game Stocks';
 return next(err);
}
}

module.exports = {
  getStockPrice,
  updateStock,
  addStock,
  getAllStocks,
  getStockBySymbol,
  getGameStocks,
  getAllGameStocks
};
