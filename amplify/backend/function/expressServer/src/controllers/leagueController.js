const League = require('../models/league.model')
const User = require('../models/user.model')
const leagueService = require('../services/leagueServices')
const portfolioServices = require('../services/portfolioServices')
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
            WinningValue,
            maxDailyTrades,
            active,
            finished
          } = req.body

    // check they have sent all fields
     if (
      typeof leagueName === 'undefined' ||
      typeof startingBalance === 'undefined' ||
      typeof leagueType === 'undefined' ||
      typeof tradingFee === 'undefined' ||
      typeof private === 'undefined' ||
      typeof WinningValue === 'undefined' ||
      typeof maxDailyTrades === 'undefined' 
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
    const league = {
        leagueName,
        startingBalance,
        leagueType,
        tradingFee,
        private,
        startDate,
        WinningValue,
        maxDailyTrades,
        active,
        finished,
        leagueAdmin: req.user.id,   // gets this from JWT
      };
   
  // call the service that generates the unique accessCode
   let newLeague = await leagueService.saveLeague(league)

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

      // get league object from db
      let league = await League.findOne({ accessCode })

      // get _id, list of UserIds, Starting Balance, name from league
      const {_id,users, startingBalance, leagueName} = league 

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

      // set portfolio object to send
      const portfolio  = {
        portfolioName: `${leagueName} Portfolio`,
        startingBalance,
        userId: req.user.id,
        leagueId:_id,
      }

      // send portfolio object to services and return the portfolio if it is created
      const leaguePortfolio = await portfolioServices.createPortfolio(portfolio)

      // res.json({leaguePortfolio})

      // update the league object in db, find by accesscode and push user_id
      league = await League.updateOne({accessCode},{$push: {users:req.user.id, portfolios: leaguePortfolio._id }})

      // push leagues to user
      const leagueUser = await User.updateOne({_id: req.user.id}, {$push: {leagues:_id}})
      
      res.json({leaguePortfolio,league, leagueUser})

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