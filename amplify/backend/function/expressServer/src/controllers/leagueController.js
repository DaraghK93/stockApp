const { FOCUSABLE_SELECTOR } = require('@testing-library/user-event/dist/utils')
const League = require('../models/league.model')

// @desc create new league. a league is created and sent to the league-data
// collection in the DB. the user's id is sent through the auth middleware,
// this id is added to the users array as the first user in the league
// @route post league/createLeague
// @access private

const createLeague = async (req, res, next) => {
    try {
        // parse the body and destructure
        const {
            leagueName,
            budget,
            leagueType,
            tradingFee,
            portfolios,
            private
          } = req.body

    // check they have sent all fields
     if (
      typeof leagueName === 'undefined' ||
      typeof budget === 'undefined' ||
      typeof leagueType === 'undefined' ||
      typeof tradingFee === 'undefined' ||
      typeof private === 'undefined'
    ) {
      // data is missing bad request
      res.status(400)
      res.errormessage = 'All details are needed to create a league'
      return next(
        new Error(
          'The client has not sent the required information to create a league',
        ),
      )
    } 

    // create new league object
    const league = new League({
        leagueName,
        budget,
        leagueType,
        tradingFee,
        private,
        leagueAdmin: req.user.id,   // gets this from JWT
        portfolios: [portfolios]
      });

    // save league to league-data collection in DB
    await league.save()

    res.json({league})

    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error creating a league';
      return next(err);
    }
}

const getPublicLeagues = async (req, res, next) => {
    try {
      // just get the leagues that aren't private
        const leagues = await League.find({private: false })
       
    
    // check if there are leagues
     if (!leagues) {
      res.status(404)
      res.errormessage = 'No leagues found'
      return next(new Error('No leagues found'))
    }

    //return the leagues
    res.json({leagues})
    
    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error in get all leagues';
      return next(err);
    }
}

module.exports = {
    createLeague,
    getPublicLeagues
  }