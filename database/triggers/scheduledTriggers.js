// this file holds the scheduled triggers that are stored on Mongo Atlas
// if we need to migrate the database these triggers can be directly copied into atlas
// the cron jobs will then need to be set up as outlined below

// start all leagues function
// set as a scheduled trigger
// runs on at 9:00am everyday as a CRON Job - 00 9 * * * - cron expr
exports = function() {

  const collection = context.services.get("finOptimiseDB").db("dev").collection("leagues");
  const today = new Date().setHours(0,0,0,0);
  
  return collection.updateMany({startDate: new Date(today),finished: false }, {$set:{active:true}});
};
  
  
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
              'leagueType':"timeBased",
              'active': true, 
              'finished': false, 
              'endDate': new Date(today)
            }
          }, {
            '$lookup': {
              'from': 'portfolioValues', 
              'localField': 'portfolios', 
              'foreignField': '_id', 
              'as': 'portfolios', 
              'pipeline': [
                {
                  '$lookup': {
                    'from': 'users', 
                    'localField': 'userId', 
                    'foreignField': '_id', 
                    'as': 'user'
                  }
                }, {
                  '$unwind': {
                    'path': '$user'
                  }
                }, {
                  '$set': {
                    'user': '$user.username'
                  }
                }, {
                  '$project': {
                    'totalValue': 1, 
                    'user': 1
                  }
                }
              ]
            }
          }, {
            '$unwind': {
              'path': '$portfolios'
            }
          }, {
            '$sort': {
              'portfolios.totalValue': -1
            }
          }, {
            '$group': {
              '_id': '$_id', 
              'league': {
                '$first': '$$ROOT'
              }, 
              'portfolios': {
                '$push': '$portfolios'
              }
            }
          }, {
            '$addFields': {
              'league.portfolios': '$portfolios'
            }
          }, {
            '$replaceRoot': {
              'newRoot': '$league'
            }
          }, {
            '$set': {
              'active': false, 
              'finished': true, 
              'finalStandings': '$portfolios'
            }
          }, {
            '$unset': 'portfolios'
          },
          {
            '$merge': {
              'into': 'leagues', 
              'on': '_id'
            }
          }
        ]);
      }
    