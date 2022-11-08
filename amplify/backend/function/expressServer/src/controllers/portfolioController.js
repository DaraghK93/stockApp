const User = require('../models/user.model')
const Portfolio = require('../models/portfolio.model');
const PortfolioService = require('../services/portfolioServices');



// @desc create new hanging portfolio
// route post portfolio/createPortfolio
// @access private

const createHangingPortfolio = async (req, res, next) => {
  try {
    // create object to be used in createPortfolio service
      const portfolioData = {
        portfolioName: req.body.portfolioName,
        startingBalance: req.body.startingBalance,
        userId: req.user.id
      }
      const createdPortfolio = PortfolioService.createPortfolio(portfolioData)
      res.json(createdPortfolio);
    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error';
      return next(err);
    }
  }



module.exports = {
  createHangingPortfolio
}
