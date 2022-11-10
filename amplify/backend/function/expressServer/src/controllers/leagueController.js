const League = require('../models/league.model')
const leagueService = require('../services/leagueServices')
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
            private,
            startDate,
            winningValue,
            maxDailyTrades,
            sectors,
            minERating,
            mingGRating,
            mingSRating,
            endDate,
            image,
            users,
            portfolios
          } = req.body

    // check they have sent all necessary fields
     if (
      typeof leagueName === 'undefined' ||
      typeof startingBalance === 'undefined' ||
      typeof leagueType === 'undefined' ||
      typeof tradingFee === 'undefined' ||
      typeof image === 'undefined' ||
      typeof maxDailyTrades === 'undefined' ||
      typeof startDate === 'undefined'
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

    // ensure  winning balance is above starting balance if it is a valuebased game
    if (leagueType === "valueBased" && winningValue <= startingBalance) {
      res.status(400)
      res.errormessage = 'Winning Balance must be greater than starting Balance '
      return next(
        new Error(
          'Winning Balance is not greater than starting balance',
        )
      )
    } 

    // ensure winningBalance is sent in a valuebased game
    if (leagueType === "valueBased" && (typeof winningValue === "undefined" )) {
      res.status(400)
      res.errormessage = 'Winning Balance must be set for value based game'
      return next(
        new Error(
          'Winning Balance must be set for value based game',
        )
      )
    } 
       
    // ensure that if it's a time based game, the endDate is sent
    if (leagueType === "timeBased" && typeof endDate === "undefined") {
      res.status(400)
      res.errormessage = 'time based games must have an end date'
      return next(
        new Error(
          'time based games must have an end date',
        ),
      )
    }
    
    // ensure starting balance is at least 1000
    if (startingBalance < 1000) {
      res.status(400)
      res.errormessage = 'Starting Balance must be greater than $1000'
      return next(
        new Error(
          'Starting balance must be at least 1000'
        ),
      )
    } 

    // ensure that the start date is not in the past
    // get today's date but without the time
    let today = new Date().setHours(0,0,0,0)
    // get start date in the same format
    const start = new Date(startDate).setHours(0,0,0,0)
    
    let active; // sent to DB

    if (start < today) {
      res.status(400)
      res.errormessage = 'Start date is in the past'
      return next(
        new Error(
          'Start date must be in the future',
        ),
 )} else if (start == today) {
        active = true
  }
  

    // ensure league is at least a day long
    if (leagueType === "timeBased") {
      // get dates in the correct format with no hours,mins,secs
      const end = new Date(endDate).setHours(0,0,0,0)

      // check that the difference between start and end is at least 1
      // divide to get it in terms of days
    if ((end - start)/(1000 * 60 * 60 * 24) < 1) {
      res.status(400)
      res.errormessage = 'Time based games must be at least a day long'
      return next(
        new Error(
          'Time based games must be at least a day long',
          ),
        )
      }
    }

    // ensure the tradingFee isn't less than 0
    if (tradingFee < 0) {
      res.status(400)
      res.errormessage = 'Trading fee must be a positive number'
      return next(
        new Error(
          'Trading fee must be a positive number',
        ),
      )
    }

    // ensure maxDailyTrades is greater than 0
    if (maxDailyTrades <= 0) {
      res.status(400)
      res.errormessage = 'Max Daily Trades must be a positive number'
      return next(
        new Error(
          'Max Daily Trades must be a positive number',
        )
      )
    }


    // create new league object
    const league = {
        leagueName,
        startingBalance,
        leagueType,
        tradingFee,
        private,
        startDate,
        winningValue,
        maxDailyTrades,
        sectors,
        minERating,
        mingGRating,
        mingSRating,
        endDate,
        active,
        image,
        users,
        portfolios,
        leagueAdmin: req.user.id,   // gets this from JWT
      };
   
  // call the service that generates the unique accessCode
    let newLeague = await leagueService.saveLeague(league)

    // call the service to join the league with that userID
    newLeague = await leagueService.joinLeague(newLeague,newLeague.leagueAdmin)

    res.json({newLeague})

    } catch (err) {
      console.error(err.message);
      res.errormessage = 'Server error creating a league';
      return next(err);
    }}

// @desc gets all public leagues
// @route get league/
// @access private
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
// @desc join league. user sends access code and if that exists it adds the
// league Id to the user, userId to league, creates a portfoliio, adds the PortfolioId
// to the league
// @route post league/joinleague
// @access private

const joinLeaguebyCode = async (req, res, next) => {
  try {

      // get the accessCode
      const {accessCode} = req.body
      if (
        typeof accessCode === 'undefined'
      ) {
        // data is missing bad request
        res.status(400)
        res.errormessage = 'an access code is needed'
        return next(
          new Error(
            'An Access Code is Needed',
          ),
          )} 

      //get current user so can pass to service and check
      const currentUser = req.user.id

      // get league object from db
      let league = await League.findOne({ accessCode })

      // 404 for no such league
      if (!league) {
        res.status(404)
        res.errormessage = 'Invalid Access Code'
        return next(new Error('Invalid Access Code'))
      }

      const newLeague = await leagueService.joinLeague(league,currentUser)

      // check for error
      if (newLeague.error === 400) {
        res.status(newLeague.error)
        res.errormessage = newLeague.errormessage
        return next(
          new Error(
            newLeague.errormessage,
          ),
          )} 
      
      res.json({newLeague})

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