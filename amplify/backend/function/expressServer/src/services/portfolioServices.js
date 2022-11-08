/// Description ///
// This contains the services for the portfolio routes.
// These services are functions that contain any data processing.
// Placed here as they are reusable between routes. 

const Portfolio = require('../models/portfolio.model');
const User = require('../models/user.model');

const createPortfolio = async (portfolioData) => {
    try {
        const newPortfolio = new Portfolio({
                portfolioName: portfolioData.portfolioName,
                remainder: portfolioData.startingBalance,
                leagueId: portfolioData.leagueId,
                dateCreated: portfolioData.dateCreated,
                userId: portfolioData.userId
        })
        await User.updateOne({ _id: req.user.id }, {$push: {portfolios: newPortfolio._id}})
        await newPortfolio.save()
        res.json({ newPortfolio });
      } catch (err) {
        console.error(err.message);
        res.errormessage = 'Server error. Portfolio not created.';
        return next(err);
      }
}


module.exports = {
    createPortfolio,
}