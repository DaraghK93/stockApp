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
            portfolios
          } = req.body

    // check they have sent all fields
     if (
      typeof leagueName === 'undefined' ||
      typeof budget === 'undefined' ||
      typeof leagueType === 'undefined' ||
      typeof tradingFee === 'undefined' 
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
    let league = await League.findOne({ leagueName })
    // Check for existing league
    if (league) {
      res.status(400)
      res.errormessage = 'league already exists, need a unique league name'
      return next(new Error('league already exists'))
    }
    // create new league object
      league = new League({
        leagueName,
        budget,
        leagueType,
        tradingFee,
        users: [req.user.id],   // gets this from JWT
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

const getLeagues = async (req, res, next) => {
    try {
        const leagues = await League.find({ })
        .populate('users') // adds the user objects to the query
    
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
    getLeagues
  }