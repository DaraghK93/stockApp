const Portfolio = require('../models/portfolio.model')
const Transaction = require('../models/transactions.model')
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


const buyStock = async (req, res, next) => {
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
    else if (req.body.buyOrSell !== "BUY"){
      // check that the type is buy
      res.status(400)
      res.errormessage = 'Not a valid buy order request'
      return next(
        new Error(
          'BuyOrSell type must be BUY.'
        )
      )
    }
    if (req.body.orderType !== "MARKET" && req.body.orderType !== "LIMIT"){
      // check that the type is buy
      res.status(400)
      res.errormessage = 'Not a valid buy order request'
      return next(
        new Error(
          'BuyOrSell type must be BUY.'
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
    let value
    let transactionStatus
    if (req.body.orderType === "LIMIT"){
      if (typeof req.body.limitValue === 'undefined'){
        // data is missing bad request
        res.status(400)
        res.errormessage = 'Limit value missing for a transaction'
        return next(
          new Error(
            'The client has not sent the required information to create a limit buy order.',
          ),
        )
      }
      if (stock.daily_change.currentprice <= req.body.limitValue){
        // check that the value is not already surpassed.
        res.status(400)
        res.errormessage = 'The current value of this stock is already less than the amount of the limit order.'
        return next(
          new Error(
            'In a buy limit order the limit value must be less than the current value of the stock.'
          )
        )
      }
    transactionStatus = "PENDING"
    value = req.body.limitValue * req.body.units
    }
    else if (req.body.orderType === "MARKET"){
      if (typeof req.body.limitValue !== 'undefined'){
        res.status(400)
        res.errormessage = 'No limit value should be assigned for a market order.'
        return next(
          new Error(
            'A limit value has been provided, should not be provided for a market order.'
          )
        )
      }
      transactionStatus = "COMPLETED"
      value = stock.daily_change.currentprice * req.body.units
    }
    
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
    const newPortfolio = await PortfolioService.buyStock(req.body, portfolio.remainder, value, transactionFee, transactionStatus)

res.json(newPortfolio)
  }
catch (err) {
  console.error(err.message);
  res.errormessage = 'Server error';
  return next(err);
}
}


// Sell Stock Route
const sellStock = async (req, res, next) => {
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
    if (req.body.buyOrSell !== "SELL"){
      // check that the type is sell
      res.status(400)
      res.errormessage = 'Not a valid sell order request'
      return next(
        new Error(
          'BuyOrSell type must be SELL.'
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
    let value
    let transactionStatus
    if (req.body.orderType === "LIMIT"){
      if (typeof req.body.limitValue === 'undefined'){
        // data is missing bad request
        res.status(400)
        res.errormessage = 'Limit value missing for a transaction'
        return next(
          new Error(
            'The client has not sent the required information to create a limit buy order.',
          ),
        )
      }
      if (stock.daily_change.currentprice >= req.body.limitValue){
        // check that the value is not already surpassed.
        res.status(400)
        res.errormessage = 'The current value of this stock is already more than the amount of the limit order.'
        return next(
          new Error(
            'In a sell limit order, the limit value must be more than the current value of the stock.'
          )
        )
      }
    transactionStatus = "PENDING"
    value = req.body.limitValue * req.body.units
    }
    else if (req.body.orderType === "MARKET"){
      if (typeof req.body.limitValue !== 'undefined'){
        res.status(400)
        res.errormessage = 'No limit value should be assigned for a market order.'
        return next(
          new Error(
            'A limit value has been provided, should not be provided for a market order.'
          )
        )
      }
      transactionStatus = "COMPLETED"
      value = stock.daily_change.currentprice * req.body.units
    }
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
    const newPortfolio = await PortfolioService.sellStock(req.body, portfolio.remainder, value, transactionFee, transactionStatus)
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
    if (mongoose.Types.ObjectId.isValid(req.params.leagueId) === false ){
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
    const leagueId = mongoose.Types.ObjectId(req.params.leagueId)
    const userId = mongoose.Types.ObjectId(req.user.id)
    // query the colelction
    const portfolio = await Portfolio.aggregate(
      [
        {
          // match on userid and leagueId
          '$match': {
            'leagueId': leagueId,
            'userId': userId
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
        }, {
          '$set': {
            'totalValue': '$totalValue.totalValue'
          }
        }
      ])

    // console.log(portfolio.portfolio)
    // if no portfolio found with the ids throw error
    if(portfolio.length===0){
      res.status(404)
      res.errormessage = 'No portfolio found'
      return next(
        new Error(
          'No portfolio found.'
        )
      )
    }
  
    // return the portfolio object
    res.json(portfolio[0])

  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
  }

const getMyGamesAndPortfolios = async (req,res,next) => {
  try{
    // cast id for aggregate query
    const userId = mongoose.Types.ObjectId(req.user.id)

    const portfolios = await Portfolio.aggregate(
      [
        {   
          // match on user ID
          '$match': {
            'userId': userId
          }
        }, {
          // join the leagues data on leagueId
          '$lookup': {
            'from': 'leagues', 
            'localField': 'leagueId', 
            'foreignField': '_id', 
            'as': 'league'
          }
        }, {
          // convert league into object
          '$unwind': {
            'path': '$league'
          }
        }, {
          // filter out inactive leagues
          '$match': {
            'league.active': true
          }
        }, {
          // set new fields for ease of access
          '$set': {
            'leagueId': '$league._id', 
            'leagueName': '$league.leagueName'
          }
        }, {
          // only return leaguename,portfolioName,
          // leagueId, (portoflioId returned as _id)
          '$project': {
            'leagueName': 1, 
            'portfolioName': 1, 
            'leagueId': 1
          }
        }
      ])

  // return the array of portfolios
  res.json(portfolios)
  }
  catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    res.status(500)
    return next(err);
  }
}

// this route is used for cancelling the limit orders
const cancelLimitOrder = async (req, res, next) => {
  try{
    // check that all of the data is there, we need portfolioID and transactionID
    if (
      typeof req.body.transactionId === 'undefined' ||
      typeof req.body.portfolioId === 'undefined'
    ) {
      // data is missing bad request
      res.status(400)
      res.errormessage = 'Transaction Id or Portfolio Id missing'
      return next(
        new Error(
          'The client has not sent the required information about the transaction',
        ),
      )
    }
    // check that the transactionId can be cast to valid objectId
    if (mongoose.Types.ObjectId.isValid(req.body.transactionId) === false ){
      // check that the transactionId is correct
      res.status(404)
      res.errormessage = 'No transaction found'
      return next(
        new Error(
          'No transaction found'
        )
      )
    }
    // check that the portfolioID can be cast to valid objectId
    if (mongoose.Types.ObjectId.isValid(req.body.portfolioId) === false ){
      // check that the portfolio ID is correct
      res.status(404)
      res.errormessage = 'No portfolio found'
      return next(
        new Error(
          'No portfolio found'
        )
      )
    }
    // get the transaction from the database
    const transaction = await Transaction.findOne({_id: req.body.transactionId, portfolioId: req.body.portfolioId})
    if(transaction.length===0){
      // if the transaction doesn't exist we get an error
      res.status(404)
      res.errormessage = 'No transaction found for that portfolio'
      return next(
        new Error(
          'There may be a transaction that exists but not for that portfolio.'
        )
      )
    }
    if(transaction.orderType !== "LIMIT"){
      // check that it is a limit order
      res.status(404)
      res.errormessage = 'Not a limit order'
      return next(
        new Error(
          'The transaction must be a limit order.'
        )
      )
    }
    if(transaction.status !== "PENDING"){
      // check that it is a PENDING order
      res.status(404)
      res.errormessage = 'The transaction must be a pending transaction'
      return next(
        new Error(
          'The transaction must be a pending transaction.'
        )
      )
    }
    let portfolio
    if(transaction.buyOrSell == "BUY"){
      // if it is a buy order then implement the service to cancel
      portfolio = await PortfolioService.cancelBuyLimitOrder(transaction)
    }
    else {
      // if it is a sell order then implement the service to cancel
      portfolio = await PortfolioService.cancelSellLimitOrder(transaction)
    }

    // return the portfolio
  res.json(portfolio)
  }
  catch (err){

  }
}

module.exports = {
  createHangingPortfolio,
  buyStock,
  sellStock,
  getLeaguePortfolio,
  getMyGamesAndPortfolios,
  cancelLimitOrder
}
