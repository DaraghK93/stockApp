/// Description ///
// This contains the services for the portfolio routes.
// These services are functions that contain any data processing.
// Placed here as they are reusable between routes. 

const Portfolio = require('../models/portfolio.model');
const User = require('../models/user.model');

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
                dateCreated: dateCreated,
                userId: portfolioData.userId
        })}
        else{
            newPortfolio = new Portfolio({
                portfolioName: portfolioData.portfolioName,
                remainder: portfolioData.startingBalance,
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


module.exports = {
    createPortfolio,
}