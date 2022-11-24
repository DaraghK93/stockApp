const Portfolio = require('../models/portfolio.model');
const League = require('../models/league.model');
const PortfolioService = require('../services/portfolioServices')
const Stock = require('../models/stock.model')
const mongoose = require('mongoose')


// @desc create new hanging portfolio
// route post portfolio/createPortfolio
// @access private

const createHangingPortfolio = async (req, res, next) => {
  try {
    // create object to be used in createPortfolio service
      if (
        typeof req.body.portfolioName === 'undefined' ||
        typeof req.body.startingBalance === 'undefined'
      ) {
        // data is missing bad request
        res.status(400)
        res.errormessage = 'All details are needed to create a portfolio'
        return next(
          new Error(
            'The client has not sent the required information to create a portfolio',
          ),
        )
      }
      else if (typeof req.body.startingBalance !== 'number'){
        res.status(400)
        res.errormessage = 'Starting balance should be a number'
        return next(new Error('Starting balance should be a number'))
      }
      else {
      const portfolioData = {
        portfolioName: req.body.portfolioName,
        startingBalance: parseFloat(req.body.startingBalance),
        userId: req.user.id
      }
        const createdPortfolio = await PortfolioService.createPortfolio(portfolioData)
        res.json(createdPortfolio)
    }
    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error';
      return next(err);
    }
  }


const buyStockMarketOrder = async (req, res, next) => {
  try{
    // check that all of the data is there
    if (
      typeof req.body.portfolioId === 'undefined' ||
      typeof req.body.stockId === 'undefined'||
      typeof req.body.units === 'undefined'||
      typeof req.body.buyOrSell === 'undefined'||
      typeof req.body.orderType === 'undefined'
    ) {
      // data is missing bad request
      res.status(400)
      res.errormessage = 'Details missing for a transaction'
      return next(
        new Error(
          'The client has not sent the required information to buy stock',
        ),
      )
    }
    else if (req.body.buyOrSell !== "BUY" || req.body.orderType !== "MARKET"){
      // check that the type is buy
      res.status(400)
      res.errormessage = 'Not a valid market buy order request'
      return next(
        new Error(
          'BuyOrSell type must be BUY and OrderType must be MARKET'
        )
      )
    }
    if (mongoose.Types.ObjectId.isValid(req.body.stockId) === false){
      // check that the stock ID is correct
      res.status(404)
      res.errormessage = 'No stock found'
      return next(
        new Error(
          'The chosen stock does not exist.'
        )
      )
    }
    if (mongoose.Types.ObjectId.isValid(req.body.portfolioId) === false){
      // check that the portfolio ID is correct
      res.status(404)
      res.errormessage = 'No Portfolio Found.'
      return next(
        new Error(
          'Portfolio must be associated to the user.'
        )
      )
    }
    const stock = await Stock.findOne({_id: req.body.stockId}).select({prices: 0})
    // check that the stock exists
    if(stock===null){
      res.status(404)
      res.errormessage = 'No stock found'
      return next(
        new Error(
          'The chosen stock does not exist.'
        )
      )
    }
    else if ( req.body.units <= 0){
      // check that the units and values exist
      res.status(400)
      res.errormessage = 'Units must be greater than 0'
      return next(
        new Error(
          'Units are negative. Should be a positive number'
        )
      )
    }
    const portfolio = await Portfolio.findOne({_id: req.body.portfolioId, userId: req.user.id})
    // check that the portfolio exists
    if(portfolio===null){
      res.status(404)
      res.errormessage = 'No Portfolio Found.'
      return next(
        new Error(
          'Portfolio must be associated to the user.'
        )
      )
    }
    const value = stock.daily_change.currentprice * req.body.units
    let transactionFee
    if (portfolio.leagueId){
      // Check that league exists and check league rules
      const response = await PortfolioService.checkLeagueRules(portfolio, stock)
      if (response.error){
        res.status(response.error)
        res.errormessage = response.errormessage
        return next(
          new Error(
            response.errormessage,
        ),
        )}
        // if there is a fee provide it here
        transactionFee = response[1]
      }
  else {
    // otherwise fee is 0
    transactionFee = 0
  }
    if ((transactionFee + value) > portfolio.remainder) {
      // check that the user has sufficient funds to complete
      res.status(400)
        res.errormessage = 'Insufficient Funds'
        return next(
          new Error(
            'User has insufficient funds to complete this buy order.'
          )
        )
    }
  
    // use the buyStock service found in the services folder
    const newPortfolio = await PortfolioService.buyStock(req.body, portfolio.remainder, value, transactionFee)

res.json(newPortfolio)
  }
catch (err) {
  console.error(err.message);
  res.errormessage = 'Server error';
  return next(err);
}
}


// Sell Stock Route
const sellStockMarketOrder = async (req, res, next) => {
  try{
    // check that all of the data is there
    if (
      typeof req.body.portfolioId === 'undefined' ||
      typeof req.body.stockId === 'undefined'||
      typeof req.body.units === 'undefined'||
      typeof req.body.buyOrSell === 'undefined'||
      typeof req.body.orderType === 'undefined'
    ) {
      // data is missing bad request
      res.status(400)
      res.errormessage = 'Details missing for a transaction'
      return next(
        new Error(
          'The client has not sent the required information to sell stock',
        ),
      )
    }
    if (req.body.buyOrSell !== "SELL" || req.body.orderType !== "MARKET"){
      // check that the type is buy
      res.status(400)
      res.errormessage = 'Must be type SELL and order type MARKET'
      return next(
        new Error(
          'Should be type Sell and order type should be MARKET'
        )
      )
    }
    if (mongoose.Types.ObjectId.isValid(req.body.stockId) === false){
      // check that the stock ID is correct
      res.status(404)
      res.errormessage = 'No stock found'
      return next(
        new Error(
          'The chosen stock does not exist.'
        )
      )
    }
    if (mongoose.Types.ObjectId.isValid(req.body.portfolioId) === false){
      // check that the portfolio ID is correct
      res.status(404)
      res.errormessage = 'No Portfolio Found.'
      return next(
        new Error(
          'Portfolio must be associated to the user.'
        )
      )
    }
    const stock = await Stock.findOne({_id: req.body.stockId}).select({prices: 0})
    // check that the stock exists
    if(stock===null){
      res.status(404)
      res.errormessage = 'No such stock'
      return next(
        new Error(
          'The chosen stock does not exist.'
        )
      )
    }
    else if ( req.body.units <= 0){
      // check that the units and values exist
      res.status(400)
      res.errormessage = 'Units must be greater than 0'
      return next(
        new Error(
          'Units are negative. Should be a positive number'
        )
      )
    }
    const portfolio = await Portfolio.findOne({_id: req.body.portfolioId, userId: req.user.id})
    // check that the portfolio exists
    if(portfolio===null){
      res.status(404)
      res.errormessage = 'Invalid portfolio.'
      return next(
        new Error(
          'Portfolio must be associated to the user.'
        )
      )
    }
    const value = stock.daily_change.currentprice * req.body.units
    let transactionFee
    if (portfolio.leagueId){
      // check whether it is in a league and whether the league exists. Also checks the league rules
      const response = await PortfolioService.checkLeagueRules(portfolio, stock)
      if (response.error){
        res.status(response.error)
        res.errormessage = response.errormessage
        return next(
          new Error(
            response.errormessage,
        ),
        )}
        // transaction Fee exists
        transactionFee = response[1]
      }
  else {
    // otherwise fee is 0
    transactionFee = 0
  }
    // use the sellStock service found in the services folder
    const newPortfolio = await PortfolioService.sellStock(req.body, portfolio.remainder, value, transactionFee)
    if (newPortfolio.error) {
      res.status(newPortfolio.error)
      res.errormessage = newPortfolio.errormessage
      return next(
        new Error(
          newPortfolio.errormessage,
        ),
        )} 
res.json(newPortfolio)
  }
catch (err) {
  console.error(err.message);
  res.errormessage = 'Server error';
  return next(err);
}
}

const getLeaguePortfolio = async (req,res,next) => {
  try{

    // check that the userId and leagueIds can be cast to valid objectIds
    if (mongoose.Types.ObjectId.isValid(req.params.userId) === false || 
        mongoose.Types.ObjectId.isValid(req.params.leagueId) === false ){
      // check that the stock ID is correct
      res.status(404)
      res.errormessage = 'No portfolio found'
      return next(
        new Error(
          'No portfolio found'
        )
      )
    }

    // cast the Ids to mongo _ids
    const userId = mongoose.Types.ObjectId(req.params.userId)
    const leagueId = mongoose.Types.ObjectId(req.params.leagueId)

    // query the colelction
    const portfolio = await Portfolio.aggregate(
      [
        {
          // match on userid and leagueId
          '$match': {
            'leagueId': userId, 
            'userId': leagueId
          }
        }, {
          // get the holdings data from the holdings view
          '$lookup': {
            'from': 'holdingsValue', 
            'localField': 'holdings', 
            'foreignField': '_id', 
            'as': 'holdings'
          }
        }, {
          // get transactions data from transacions
          '$lookup': {
            'from': 'transactions', 
            'localField': 'transactions', 
            'foreignField': '_id', 
            'as': 'transactions', 
            'pipeline': [
              { 
                // within this get the stock data needed from the stockId ref
                '$lookup': {
                  'from': 'stocks', 
                  'localField': 'stockId', 
                  'foreignField': '_id', 
                  'as': 'stock', 
                  'pipeline': [
                    {
                      // only show the symbol and shortname
                      '$project': {
                        'symbol': 1, 
                        'shortname': 1
                      }
                    }
                  ]
                }
              }
            ]
          }
        }, {
          // get the portfolio total values from the view
          '$lookup': {
            'from': 'portfolioValues', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'totalValue', 
            'pipeline': [
              {
                // just show the value
                '$project': {
                  'totalValue': 1
                }
              }
            ]
          }
        }, {// change it form an array to an object
          '$unwind': {
            'path': '$totalValue'
          }
        }
      ])

    // if no portfolio found with the ids throw error
    if(portfolio===null){
      res.status(404)
      res.errormessage = 'No portfolio found'
      return next(
        new Error(
          'No portfolio found.'
        )
      )
    }
  
  // return the portfolio object
  res.json({portfolio})
  
} catch (err) {
  console.error(err.message);
  res.errormessage = 'Server error';
  return next(err);
}
}


module.exports = {
  createHangingPortfolio,
  buyStockMarketOrder,
  sellStockMarketOrder,
  getLeaguePortfolio
}
