const League = require('../models/league.model')
const User = require('../models/user.model')
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
            startingBalance,
            leagueType,
            tradingFee,
            portfolios,
            private,
            startDate,
            WinningValue,
            maxDailyTrades,
            active,
            accessCode,
          } = req.body

    // check they have sent all fields
     if (
      typeof leagueName === 'undefined' ||
      typeof startingBalance === 'undefined' ||
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
        startingBalance,
        leagueType,
        tradingFee,
        private,
        startDate,
        WinningValue,
        maxDailyTrades,
        accessCode,
        active,
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
            .select('-leagueAdmin -users -portfolios')
       
    
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
      res.errormessage = 'Server error in get public leagues';
      return next(err);
    }
}

const joinLeaguebyCode = async (req, res, next) => {
  try {
      // get the accessCode
      const {accessCode} = req.body
      // get league object from db
      let league = await League.findOne({ accessCode })
      // get _id from league
      const {_id,users} = league 

      // 404 for no such league
      if (!league) {
        res.status(404)
        res.errormessage = 'Invalid Access Code'
        return next(new Error('Invalid Access Code'))
      }

      // check if user is already in the league
      if (users.includes(req.user.id)){
        res.status(400)
        res.errormessage = 'User already in league'
        return next(new Error('User already in league'))
      }

      // update the league object in db, find by accesscode and push user_id
      await League.updateOne({accessCode},{$push: {users:req.user.id}})

      // push leagues to user
      await User.updateOne({_id}, {$push: {leagues:_id}})
      res.json({league})

} catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error in join league';
      return next(err);
    }
}

module.exports = {
    createLeague,
    getPublicLeagues,
    joinLeaguebyCode
  }