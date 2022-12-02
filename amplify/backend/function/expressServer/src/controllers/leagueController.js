const League = require('../models/league.model')
const leagueService = require('../services/leagueServices')

const mongoose = require("mongoose")
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
          'The client has not sent the required information to create a league'
        ),
      )
    } 

      // check sector length is at least 1
    if (typeof sectors !== "undefined" && sectors.length < 1) {
      res.status(400)
      res.errormessage = 'At least one sector must be chosen'
      return next(
        new Error(
          'At least one sector must be chosen'
        ),
      )
    }
    const sectorArray = ['Basic Materials',
                        'Communication Services',
                        'Consumer Cyclical',
                        'Consumer Defensive',
                        'Energy',
                        'Financial Services',
                        'Healthcare',
                        'Industrials',
                        'Real Estate',
                        'Technology',
                        'Utilities']
    if (typeof sectors !== "undefined") {
      for (const element of sectors) {
      // sectors.forEach(element => {
        if (sectorArray.includes(element) === false) {
          res.status(400)
          res.errormessage = 'One or more of the sectors chosen is not valid'
          return next(
            new Error(
              'One or more of the sectors chosen is not valid'
            )
          )
        }}}

       
    // ensure that the image sent is one of the correct images
    const imageArray = ["/stock_photo_1.jpg",
                        "/stock_photo_2.jpg",
                        "/stock_photo_3.jpg",
                        "/stock_photo_4.jpg"]
    if (typeof image !== "undefined" && imageArray.includes(image) === false ) {
      res.status(400)
      res.errormessage = 'A valid image must be chosen'
      return next(
        new Error(
          'A valid image must be chosen'
        ),
      )
    }

    // ensure  winning balance is above starting balance if it is a valuebased game
    if (leagueType === "valueBased" && winningValue <= startingBalance) {
      res.status(400)
      res.errormessage = 'Winning Balance must be greater than starting Balance '
      return next(
        new Error(
          'Winning Balance is not greater than starting balance'
        )
      )
    } 

    // ensure winningBalance is sent in a valuebased game
    if (leagueType === "valueBased" && (typeof winningValue === "undefined" )) {
      res.status(400)
      res.errormessage = 'Winning Balance must be set for value based game'
      return next(
        new Error(
          'Winning Balance must be set for value based game'
        )
      )
    } 
    // ensure user doesn't send endDate in valueBased game
    if (leagueType === "valueBased" && (typeof endDate !== "undefined" )) {
      res.status(400)
      res.errormessage = 'Value based games should not have an end date'
      return next(
        new Error(
          'Value based games should not have an end date'
        )
      )
    } 
       
    // ensure that if it's a time based game, the endDate is sent
    if (leagueType === "timeBased" && typeof endDate === "undefined") {
      res.status(400)
      res.errormessage = 'Time based games must have an end date'
      return next(
        new Error(
          'Time based games must have an end date',
        ),
      )
    }

    // ensure user doesn't send winingvalue in timebased game
    if (leagueType === "timeBased" && typeof winningValue !== "undefined") {
      res.status(400)
      res.errormessage = 'Time based games should not have a winning value'
      return next(
        new Error(
          'Time based games should not have a winning value',
        ),
      )
    }

    // ensure starting balance is at least 1000
    if (startingBalance < 1000 || startingBalance > 1000000) {
      res.status(400)
      res.errormessage = 'Starting Balance must be greater than $1000 and less than $1,000,000'
      return next(
        new Error(
          'Starting Balance must be greater than $1000 and less than $1,000,000'
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

    // instantiate league so we can add formatteed endDate
    let league = {}
    // ensure league is at least a day long
    if (leagueType === "timeBased") {
      // get dates in the correct format with no hours,mins,secs
    const end = new Date(endDate).setHours(0,0,0,0)
    league.endDate = end
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

    // ensure the tradingFee is in the right interval
    if (tradingFee < 0 || tradingFee > 300) {
      res.status(400)
      res.errormessage = 'Trading fee must be between 0 and 300'
      return next(
        new Error(
          'Trading fee must be between 0 and 300',
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


    // assign the remaining foelds to the league object
    // if league is timeBased, endDate will be already assigned
    // otherwise it will be an empty object
    league = {
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
      res.errormessage = "Unfortunately we could not create the league at this time";
      res.status(500)
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
      res.status(500)
      return next(err);
    }
}

// @desc gets all of a user's leagues. sorts into active, scheduled and completed
// @route get league/myleagues
// @access private
const getMyLeagues = async (req, res, next) => {
  try{

      // convert user_id into type objectId as facet doesn't use indexes
      const user = mongoose.Types.ObjectId(req.user.id)
      
      const leagues = await League.aggregate([
        { $facet: 

            // active games
            { active: [
                      {$match : 
                          {$and:[
                            {active:true},
                            {finished:false},
                            {users:{$elemMatch:{$eq:user}}} // where userId is in users array
                            ]}},
                      {$project: {'leagueName':1,
                                  "leagueType":1, 
                                  "winningValue":1,
                                  countPlayers: { $size:"$users" }, 
                                  "startDate":1,
                                  "image":1,
                                  "endDate":1}}, 
                      {$sort: {"startDate": -1}},
                      {$limit: 20}], 
              //scheduled games                    
              scheduled: [
                      {$match : 
                          {$and:[
                            {active:false},
                            {finished:false},
                            {users:{$elemMatch:{$eq:user}}}]}},
                      {$project: {'leagueName':1,
                                  "leagueType":1, 
                                  "winningValue":1,
                                  countPlayers: { $size:"$users" }, 
                                  "startDate":1,
                                  "image":1,
                                  "endDate":1}}, 
                      {$sort: {"startDate": -1}},
                      {$limit: 20}],
              // complete games                    
              complete: [
                      {$match : 
                          {$and:[
                            {active:false},
                            {finished:true},
                            {users:{$elemMatch:{$eq:user}}}
                            ]}},
                      {$project: {'leagueName':1,
                                  "leagueType":1, 
                                  "winningValue":1,
                                  countPlayers: { $size:"$users" }, 
                                  "startDate":1,
                                  "image":1,
                                  "endDate":1}},
                      {$sort: {"startDate": -1}},
                      {$limit: 20}], 
        }}])
      
      res.json({leagues})

  } catch (err) {
    console.error(err.message);
    res.status(500)
    res.errormessage = 'Server error in get my leagues';
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
        res.errormessage = 'An access code is needed'
        return next(
          new Error(
            'An Access Code is Needed',
          ),
          )} 

      //get current user so can pass to service and check
      const currentUser = req.user.id

      // get league object from db
      let league = await League.findOne({ accessCode, finished:false })

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
      res.status(500)
      res.errormessage = 'Server error in join league';
      return next(err);
    }
}

// @desc get leauge by the leagueId. returns all info about the league and also
// returns a sorted array of portfolios, which will be used as the leaderboard
// @route get league/:leagueId
// @access private

const getLeagueById = async (req,res,next) => {
  try{
   
   // check that the leagueId can be cast to valid objectId
    if (mongoose.Types.ObjectId.isValid(req.params.leagueId) === false ){
    // check that the stock ID is correct
    res.status(404)
    res.errormessage = 'No league found'
    return next(
      new Error(
        'No portfolio found'
      )
    )
  }
  // cast to mongoose _id
  const leagueId = mongoose.Types.ObjectId(req.params.leagueId)
  const userId = mongoose.Types.ObjectId(req.user.id)
    const league = await League.aggregate(
      [
        {// match on ids and user being in users array
          '$match': {
            '_id': leagueId,
            'users': {$in:[userId]}
          }
        }, {// lookup on portfolio values
          '$lookup': {
            'from': 'portfolioValues', 
            'localField': 'portfolios', 
            'foreignField': '_id', 
            'as': 'portfolios', 
            'pipeline': [
              {// lookup the users wihin this so we can identify each by the portfolio
                '$lookup': {
                  'from': 'users', 
                  'localField': 'userId', 
                  'foreignField': '_id', 
                  'as': 'user'
                }
              }, {//  make into object
                '$unwind': {
                  'path': '$user'
                }
              }, {// set user as jst their username
                '$set': {
                  'user': '$user.username'
                }
              }, {// show totalvalue, username, and valuehistory array
                '$project': {
                  'totalValue': 1, 
                  'user': 1, 
                  'valueHistory': 1
                }
              }
            ]
          }
        },{ // lookup the leagueAdmin to display username
          '$lookup': {
            'from': 'users', 
            'localField': 'leagueAdmin', 
            'foreignField': '_id', 
            'as': 'leagueAdmin', 
            'pipeline': [
              {
                '$project': {
                  'username': 1
                }
              }
            ]
          }
        }, { // make into object
          '$unwind': {
            'path': '$leagueAdmin'
          }
        }, {// make into its own field without the Id
          '$set': {
            'leagueAdmin': '$leagueAdmin.username'
          }
        }, {// make into objects, will be made back into array after sorting
          '$unwind': {
            'path': '$portfolios'
          }
        },  { // sort the portfolios array desc.
             // used as leaderboard
          '$sort': {
            'portfolios.totalValue': -1
          }
        }, {// group by id and show all fields of league
          '$group': {
            '_id': '$_id', 
            'league': {
              '$first': '$$ROOT'
            }, // push the portfolios array to portfolios field
            'portfolios': {
              '$push': '$portfolios'
            }
          }
        }, {// make this it's own field
          '$addFields': {
            'league.portfolios': '$portfolios'
          }
        }, {/// make league the root object
          '$replaceRoot': {
            'newRoot': '$league'
          }
        }
      ])

    // check if there is a league for that id that has that user
    if (league.length===0) {
    res.status(404)
    res.errormessage = 'No game found'
    return next(new Error('No game found'))
  }
    
    res.json(league[0])
  }
  catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error in getting game';
    res.status(500)
    return next(err);
  }

}

module.exports = {
    createLeague,
    getPublicLeagues,
    joinLeaguebyCode,
    getMyLeagues,
    getLeagueById
  }