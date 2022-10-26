const User = require('../models/user.model')
const Portfolio = require('../models/portfolio.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')


// @desc create new portfolio
// route post portfolio/createPortfolio
// @access private

const createPortfolio = async (req, res, next) => {
  try {
      dateCreated = new Date()
      const newPortfolio = new Portfolio({
        portfolioName: req.query.portfolioName,
        remainder: req.query.remainder,
        dateCreated: dateCreated
      });
      await User.updateOne({ email: req.query.email }, {$push: {portfolios: newPortfolio}})
        
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
