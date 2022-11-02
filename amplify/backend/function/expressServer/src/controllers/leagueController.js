const League = require('../models/league.model')

// @desc create new league
// @route post league/createLeague
// @access private

const createLeague = async (req, res, next) => {
    try {
        const league = new League({
            leagueName: req.body.leagueName,
            budget: req.body.budget,
            leagueType: req.body.leagueType,
            tradingFee: req.body.tradingFee,
            users: [req.user.id],
            portfolios: [req.body.portfolios]
          });
    await league.save()

    res.json({league})
    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error';
      return next(err);
    }
}

const getLeagues = async (req, res, next) => {
    try {
        const leagues = await League.find({ })
        .populate('users')

    res.json({leagues})
    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error';
      return next(err);
    }
}

module.exports = {
    createLeague,
    getLeagues
  }