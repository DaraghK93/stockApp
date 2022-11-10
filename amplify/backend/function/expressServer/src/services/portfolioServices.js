/// Description ///
// This contains the services for the portfolio routes.
// These services are functions that contain any data processing.
// Placed here as they are reusable between routes. 

const Portfolio = require('../models/portfolio.model');
const User = require('../models/user.model');
const Transaction = require('../models/transactions.model');
const Holdings = require('../models/holdings.model');

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
                userId: portfolioData.userId
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

const buyStock = async (buyData, portfolioRemainder,value) => {
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
        transactionCost: buyData.transactionCost
    })

    // finds existing holdings in the db for that portfolio
    const holdings = await Holdings.findOne({portfolioId: transaction.portfolioId, stockId: transaction.stockId})

    let newHoldings

    // if there are holdings, then the current holdings are updated
    if (holdings != null){
        // add the new units to the existing units
        const currentHoldings = transaction.units + holdings.units
        // update the db
        newHoldings = await Holdings.updateOne({_id: holdings._id}, {units: currentHoldings})
        // calculate the remaining user funds
        const newRemainder = portfolioRemainder - transaction.value
        // create transaction object
        await transaction.save()
        // update the portfolio, adding a transaction object ID and updating the remainder
        const newPortfolio = await Portfolio.findByIdAndUpdate({_id: transaction.portfolioId}, {$push: {transactions: transaction}, $set: {remainder: newRemainder}}, {new:true})
        return newPortfolio
    }
    else {
        // if there are no holdings, a new one can be created
        newHoldings = new Holdings({
        portfolioId: transaction.portfolioId,
        stockId: transaction.stockId,
        units: transaction.units
        })
        // a new holding is added to the db
        await newHoldings.save()
        // a new transaction is added to the db
        await transaction.save()
        const newRemainder = portfolioRemainder - transaction.value
        // update the portfolio, adding a transaction object ID, a holdings object ID and updating the remainder 
        const newPortfolio = await Portfolio.findByIdAndUpdate({_id: transaction.portfolioId}, {$push: {holdings: newHoldings, transactions: transaction}, $set: {remainder: newRemainder}}, {new:true})
        return newPortfolio
    }
    }
    catch (err) {
        console.error(err.message);
        res.errormessage = 'Server error. Stock has not been purchased.';
        return next(err)
    }
}

module.exports = {
    createPortfolio,
    buyStock
}