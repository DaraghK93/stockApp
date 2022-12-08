// this file holds the database triggers that are stored on Mongo Atlas
// the code can directly be entered to atals if we migrate
// all database triggers watch a certain collection for a certain operation 
// when this operation on this collection is actioned, they run. 


// finish a value based league
// runs every time the stocks collection is updated (equates to every 20 minutes)
// -- collection: stocks
// -- operation: update

exports = function(changeEvent) {

  const collection = context.services.get("finOptimiseDB").db("dev").collection("leagues");
  return collection.aggregate([
    {// match on active and valueBased leagues
      '$match': {
        'finished': false, 
        'active': true, 
        'leagueType': 'valueBased'
      }
    }, {// bring in portfolio values
      '$lookup': {
        'from': 'portfolioValues', 
        'localField': 'portfolios', 
        'foreignField': '_id', 
        'as': 'values'
      }
    }, {// set the max value to a portfolioMax field
      '$set': {
        'portfolioMax': {
          '$max': '$values.totalValue'
        }
      }
    }, {// match on leagues where max portfolio value is >= winningValue
      '$match': {
        '$expr': {
          '$gte': [
            '$portfolioMax', '$winningValue'
          ]
        }
      }
    }, {// get rid of that field
      '$unset': [
        'values', 'portfolioMax'
      ]
    }, {// lookup the portfolio values and sort to get leaderboard
      '$lookup': {
        'from': 'portfolioValues', 
        'localField': 'portfolios', 
        'foreignField': '_id', 
        'as': 'portfolios', 
        'pipeline': [
          { // bring in usenames
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
          }, { // set the totalValue and username
            '$project': {
              'totalValue': 1, 
              'user': 1
            }
          }
        ]
      }
    }, { // make into objects
      '$unwind': {
        'path': '$portfolios'
      }
    }, {// sort
      '$sort': {
        'portfolios.totalValue': -1
      }
    }, { // group byleague and portfolio 
      '$group': {
        '_id': '$_id', 
        'league': {
          '$first': '$$ROOT'
        }, 
        'portfolios': {
          '$push': '$portfolios'
        }
      }
    }, {// set the pportfolios field to the leaderboard
      '$addFields': {
        'league.portfolios': '$portfolios'
      }
    }, {// make league the root object
      '$replaceRoot': {
        'newRoot': '$league'
      }
    }, {// finish the league and set finalStandings
      '$set': {
        'finished': true, 
        'active': false, 
        'finalStandings': '$portfolios'
      }
    }, {// merge to documents
      '$merge': {
        'into': 'leagues', 
        'on': '_id'
      }
    }
  ]);
};