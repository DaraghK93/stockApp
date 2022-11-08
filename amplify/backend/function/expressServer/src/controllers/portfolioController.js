const User = require('../models/user.model')
const Portfolio = require('../models/portfolio.model');
const PortfolioService = require('../services/portfolioServices');



// @desc create new portfolio
// route post portfolio/createPortfolio
// @access private

const createHangingPortfolio = async (req, res, next) => {
  try {
      dateCreated = new Date()
      const portfolioData = {
        portfolioName: req.body.portfolioName,
        startingBalance: req.body.startingBalance,
        leagueId: req.body.leagueId,
        dateCreated: dateCreated,
        userId: req.user.id
      }

      var createdPortfolio = PortfolioService.createPortfolio(portfolioData)
      res.json({ createdPortfolio });
    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error';
      return next(err);
    }
  }



module.exports = {
  createHangingPortfolio
}
