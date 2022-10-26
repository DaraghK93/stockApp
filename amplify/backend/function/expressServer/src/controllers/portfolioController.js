const User = require('../models/user.model')
const Portfolio = require('../models/portfolio.model')



// @desc create new portfolio
// route post portfolio/createPortfolio
// @access private

const createPortfolio = async (req, res, next) => {
  try {
      dateCreated = new Date()
      if (!req.body.remainder){
        remainder = 10000
      }
      else {
        remainder = req.body.remainder
      }
      const newPortfolio = new Portfolio({
        portfolioName: req.body.portfolioName,
        remainder: remainder,
        dateCreated: dateCreated
      });
      await User.updateOne({ _id: req.user.id }, {$push: {portfolios: newPortfolio}})
        
      res.json({ newPortfolio });
    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error';
      return next(err);
    }
  }



module.exports = {
  createPortfolio
}
