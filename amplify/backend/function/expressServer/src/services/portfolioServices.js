/// Description ///
// This contains the services for the portfolio routes.
// These services are functions that contain any data processing.
// Placed here as they are reusable between routes. 

const Portfolio = require('../models/portfolio.model')
const User = require('../models/user.model')
const League = require('../models/league.model')
const Transaction = require('../models/transactions.model');
const Holdings = require('../models/holdings.model')
const mongoose = require('mongoose')

// This function will create a portfolio in the portfolios collection and also add a reference to 
// the object in the user schema
const createPortfolio = async (portfolioData) => {
    try {
        dateCreated = new Date()
        let newPortfolio;
        // this checks if league ID is entered
        // league Id needed if the portfolio is part of a game
        if (!portfolioData.leagueId) {
            newPortfolio = new Portfolio({
                portfolioName: portfolioData.portfolioName,
                remainder: portfolioData.startingBalance,
                startingBalance: portfolioData.startingBalance,
                dateCreated: dateCreated,
                userId: portfolioData.userId
        })}
        else{
            newPortfolio = new Portfolio({
                portfolioName: portfolioData.portfolioName,
                remainder: portfolioData.startingBalance,
                startingBalance: portfolioData.startingBalance,
                leagueId: portfolioData.leagueId,
                dateCreated: dateCreated,
                userId: portfolioData.userId,
                frozenBalance: 0
        })}
        // adds an object reference to the portfolio
        await User.updateOne({ _id: newPortfolio.userId }, {$push: {portfolios: newPortfolio._id}})
        // creates a portfolio
        await newPortfolio.save()
        return newPortfolio
      } catch (err) {
        console.error(err.message);
        res.errormessage = 'Server error. Portfolio not created.';
        return next(err);
      }
}

const buyStock = async (buyData, portfolioRemainder,value, transactionFee, status) => {
    // creates a date so that it is known when it was created
    try{
        const date = new Date()

        // creates a transaction model
        const transaction = new Transaction({
        portfolioId: buyData.portfolioId,
        stockId: buyData.stockId,
        units: buyData.units,
        value: value,
        date: date,
        buyOrSell: buyData.buyOrSell,
        orderType: buyData.orderType,
        tradingFee: transactionFee,
        limitValue: buyData.limitValue,
        status: status
    })

    // finds existing holdings in the db for that portfolio
    const holdings = await Holdings.findOne({portfolioId: transaction.portfolioId, stockId: transaction.stockId})

    let newHoldings

    // if there are holdings, then the current holdings are updated
    if (holdings != null){
        // calculate the remaining user funds
        
        // add the new units to the existing units
        const currentHoldings = transaction.units + holdings.units
        // create transaction object
        await transaction.save()
        let newRemainder
        let newPortfolio
        if (transaction.orderType === "MARKET"){
            // update the db for market order
            newHoldings = await Holdings.updateOne({_id: holdings._id}, {units: currentHoldings})
            newRemainder = portfolioRemainder - transaction.value - transaction.tradingFee
            newPortfolio = await Portfolio.findByIdAndUpdate({_id: transaction.portfolioId}, {$push: {transactions: transaction}, $set: {remainder: newRemainder}, $inc: {tradesToday:1}}, {new:true})
        }
        else {
            newRemainder = portfolioRemainder - transaction.limitValue*transaction.units - transaction.tradingFee
            newPortfolio = await Portfolio.findByIdAndUpdate({_id: transaction.portfolioId}, {$push: {transactions: transaction}, $set: {remainder: newRemainder},$inc: {tradesToday: 1, frozenBalance: transaction.limitValue*transaction.units}}, {new:true})
        }
        // update the portfolio, adding a transaction object ID and updating the remainder
        return newPortfolio
    }
    else {
        // a new transaction is added to the db
        await transaction.save()

        // if there are no holdings, a new one can be created
        newHoldings = new Holdings({
        portfolioId: transaction.portfolioId,
        stockId: transaction.stockId,
        units: transaction.units,
        frozenHoldingsUnits: 0
        })
        let newPortfolio
        let newRemainder
        if (transaction.orderType === "MARKET"){
        // a new holding is added to the db
        await newHoldings.save()
        newRemainder = portfolioRemainder - transaction.value - transactionFee
        // update the portfolio, adding a transaction object ID, a holdings object ID and updating the remainder 
            newPortfolio = await Portfolio.findByIdAndUpdate({_id: transaction.portfolioId}, {$push: {holdings: newHoldings, transactions: transaction}, $set: {remainder: newRemainder}, $inc: {tradesToday: 1}}, {new:true})
        }
        else {
            newRemainder = portfolioRemainder - transaction.limitValue*transaction.units - transaction.tradingFee
            newPortfolio = await Portfolio.findByIdAndUpdate({_id: transaction.portfolioId}, {$push: {transactions: transaction}, $set: {remainder: newRemainder},$inc: {tradesToday: 1, frozenBalance: transaction.limitValue*transaction.units}}, {new:true})
        }
        return newPortfolio
    }
    }
    catch (err) {
        throw new Error(`Error has occured in buying the stock.\nError details:\n\t${err}`)
    }
}

const sellStock = async (sellData, portfolioRemainder,value, transactionFee, status) => {
    // creates a date so that it is known when it was created
    try{
        const date = new Date()

        // creates a transaction model
        const transaction = new Transaction({
            portfolioId: sellData.portfolioId,
            stockId: sellData.stockId,
            units: sellData.units,
            value: value,
            date: date,
            buyOrSell: sellData.buyOrSell,
            orderType: sellData.orderType,
            tradingFee: transactionFee,
            limitValue: sellData.limitValue,
            status: status
        })
    // finds existing holdings in the db for that portfolio
    const holdings = await Holdings.findOne({portfolioId: transaction.portfolioId, stockId: transaction.stockId})


    // if there are holdings, then the current holdings are updated
    if (holdings != null){
        var newHoldings = holdings.units - transaction.units
        let frozenHoldings
        if (transaction.orderType === "MARKET"){
            frozenHoldings = 0
        }
        else {
            frozenHoldings = transaction.units
        }
        
        if (newHoldings > 0) {
            // if the holdings are greater than 0, update the existing holdings
            await Holdings.updateOne({_id:holdings._id}, {$set: {units: newHoldings}, $inc: {frozenHoldingsUnits: frozenHoldings}})

            // create a new transaction
            await transaction.save()
            let newPortfolio
            if (transaction.orderType === "MARKET"){
                newRemainder = portfolioRemainder + value - transactionFee
                // find and update the portfolio, adding ref to transaction, setting new remainder, increasing the number associated to the number of trades today
                newPortfolio = await Portfolio.findByIdAndUpdate({_id: transaction.portfolioId}, {$push: {transactions: transaction}, $set: {remainder: newRemainder}, $inc: {tradesToday: 1}}, {new:true})
            }
            else{
                newPortfolio = await Portfolio.findByIdAndUpdate({_id: transaction.portfolioId}, {$push: {transactions: transaction}, $inc: {tradesToday: 1}}, {new:true})
            }
            return newPortfolio
        }
        else if (newHoldings === 0){
            if(transaction.orderType === "MARKET"){
            // if the holdings are 0 then the holdings referenced should be deleted
            await Holdings.findByIdAndDelete({_id:holdings._id})
            }
            else {
            await Holdings.updateOne({_id:holdings._id}, {units: newHoldings, $inc: {frozenHoldingsUnits: frozenHoldings}})
            }
            // create a new transaction
            await transaction.save()
            let newPortfolio
            if (transaction.orderType === "MARKET"){
                newRemainder = portfolioRemainder + value - transactionFee
                // find and update the portfolio, adding ref to transaction, setting new remainder, removing the ref to the holding, increasing the number associated to the number of trades today
                newPortfolio = await Portfolio.findByIdAndUpdate({_id: transaction.portfolioId},{$push: {transactions: transaction}, $set: {remainder: newRemainder}, $pull: {holdings: holdings._id}, $inc: {tradesToday: 1}}, {new:true})
            }
            else{
                newPortfolio = await Portfolio.findByIdAndUpdate({_id: transaction.portfolioId},{$push: {transactions: transaction}, $inc: {tradesToday: 1}}, {new:true})
            }
            return newPortfolio
        }
        else if (newHoldings < 0) {
            return {error:400, errormessage: "You do not have enough units to sell."}
        }
    }
    else {
        // if there are no holdings return an error
        
        return {error:404, errormessage: "No holding of that stock exists"}
    }
    }
    catch (err) {
        throw new Error(`Error has occured in selling the stock.\nError details:\n\t${err}`)
    }
}

const checkLeagueRules = async (portfolio, stock, transactionFee) => {
    try{

      if (mongoose.Types.ObjectId.isValid(portfolio.leagueId) === false){
        // check that the league ID is correct
        return {error:404, errormessage: "No League Found"}
      }
      const league = await League.findOne({_id: portfolio.leagueId})
      if (league===null) {
        // if there are no leagues then return an error
        return {error:404, errormessage: "No League Found"}
      }
      else {
        transactionFee = league.tradingFee
        if (!league.sectors.includes(stock.sector)){
            // if the sector is not in the allowed sectors list then return error
            return {error:400, errormessage: "Invalid sector chosen. League only allows stocks from certain sectors."}
        }
        if (stock.esgrating.environment_score < league.minERating) {
            // if E rating is too low return error
            return {error:400, errormessage: "Environmental Score is lower than the allowable score as per league rules."}
        }
        if (stock.esgrating.social_score < league.minSRating) {
            // if S rating is too low return error
            return {error:400, errormessage: "Social Score is lower than the allowable score as per league rules."}
        }
        if (stock.esgrating.governance_score < league.minGRating) {
            // if G rating is too low return error
            return {error:400, errormessage: "Governance Score is lower than the allowable score as per league rules."}
        }
        if (portfolio.tradesToday > league.maxDailyTrades - 1) {
            // if the number of trades is too many return an error
            return {error:400, errormessage: 'The league has set a maximum number of trades that can be completed in 24 hours. You have reached this limit.'}
        }
    }
    return [league, transactionFee]
  }
    catch (err) {
        throw new Error(`Error has occured in checking if league exists.\nError details:\n\t${err}`)
    }
}

const cancelBuyLimitOrder = async (transactionData) => {
    // to cancel a buy limit order
    try{
        const transactionId = mongoose.Types.ObjectId(transactionData._id)
        await Transaction.findByIdAndUpdate({_id: transactionId}, {status: "CANCELLED"})
        const portfolio = await Portfolio.findByIdAndUpdate({_id: transactionData.portfolioId}, {$inc:{remainder: transactionData.value, frozenBalance: -transactionData.value}})
        return portfolio
    }
    catch (err) {
        throw new Error(`Error has occured in cancelling the limit order.\nError details:\n\t${err}`)
    }
}

module.exports = {
    createPortfolio,
    buyStock,
    sellStock,
    checkLeagueRules,
    cancelBuyLimitOrder
}