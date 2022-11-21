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
    if(req.body.orderType!== "MARKET" && req.body.orderType !== "LIMIT"){
      res.status(400)
      res.errormessage = 'Invalid Order Type.'
      return next(
        new Error(
          'Order type should be MARKET or LIMIT.'
        )
      )
    }
    const value = stock.daily_change.currentprice * req.body.units
    if (req.body.leagueId){
      if (mongoose.Types.ObjectId.isValid(req.body.leagueId) === false){
        // check that the portfolio ID is correct
        res.status(404)
        res.errormessage = 'No league found.'
        return next(
          new Error(
            'League does not exist.'
          )
        )
      }
  }
    const league = League.findOne({_id: req.body.leagueId})
    if (value > portfolio.remainder) {
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
    const newPortfolio = await PortfolioService.buyStock(req.body, portfolio.remainder, value)

res.json(newPortfolio)
  }
catch (err) {
  console.error(err.message);
  res.errormessage = 'Server error';
  return next(err);
}
}



module.exports = {
  createHangingPortfolio,
  buyStockMarketOrder
}
