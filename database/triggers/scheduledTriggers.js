// this file holds the scheduled triggers that are stored on Mongo Atlas
// if we need to migrate the database these triggers can be directly copied into atlas
// the cron jobs will then need to be set up as outlined below

// start all leagues function
// set as a scheduled trigger
// runs on at 9:00am everyday as a CRON Job - 00 9 * * * - cron expr
exports = function() {

    const collection = context.services.get("finOptimiseDB").db("dev").collection("leagues");
    // get today in date format
    const today = new Date().setHours(0,0,0,0);
    //update any collection where the startDate is today. set active to true. starts the league
    return collection.updateMany({ startDate: new Date(today) }, {$set:{active:true}});
  
  }
  
  // finish time based leagues function
  // scheduled trigger
  // runs at 21:00 everyday as a CRON Job - 00 21 * * * - cron expr
  exports = function() {

    const collection = context.services.get("finOptimiseDB").db("dev").collection("leagues");
        const today = new Date().setHours(0,0,0,0);
        // update any league where the endDate is today
        // active to false, finished to true.  ends the league
        return collection.aggregate([
          {
            '$match': {
              // match on active timebased leagues where endDate is today
              'leagueType':"timeBased",
              'active': true, 
              'finished': false, 
              'endDate': new Date(today)
            }
          }, {
            // get portfolio values
            '$lookup': {
              'from': 'portfolioValues', 
              'localField': 'portfolios', 
              'foreignField': '_id', 
              'as': 'portfolios', 
              'pipeline': [
                {// lookup user names
                  '$lookup': {
                    'from': 'users', 
                    'localField': 'userId', 
                    'foreignField': '_id', 
                    'as': 'user'
                  }
                }, {
                  // set into array
                  '$unwind': {
                    'path': '$user'
                  }
                }, {
                  // set user as the username
                  '$set': {
                    'user': '$user.username'
                  }
                }, {// just show value and username
                  '$project': {
                    'totalValue': 1, 
                    'user': 1
                  }
                }
              ]
            }
          }, {// make portfolios into array for sorting
            '$unwind': {
              'path': '$portfolios'
            }
          }, {// sort to get leaderboard
            '$sort': {
              'portfolios.totalValue': -1
            }
          }, {// group by league and portfolios and make into their own objects
            '$group': {
              '_id': '$_id', 
              'league': {
                '$first': '$$ROOT'
              }, 
              // push the leaderboard to portfolio field
              'portfolios': {
                '$push': '$portfolios'
              }
            }
          }, {// add that field to main league object
            '$addFields': {
              'league.portfolios': '$portfolios'
            }
          }, {// make league the root object
            '$replaceRoot': {
              'newRoot': '$league'
            }
          }, {// finish the game and set leaderboard to finalStandings
            '$set': {
              'active': false, 
              'finished': true, 
              'finalStandings': '$portfolios'
            }
          }, {// merge the changes
            '$merge': {
              'into': 'leagues', 
              'on': '_id'
            }
          }
        ]);
      }