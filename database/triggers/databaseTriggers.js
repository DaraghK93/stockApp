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
    {
      '$match': {
        'finished': false, 
        'active': true, 
        'leagueType': 'valueBased'
      }
    }, {
      '$lookup': {
        'from': 'portfolioValues', 
        'localField': 'portfolios', 
        'foreignField': '_id', 
        'as': 'values'
      }
    }, {
      '$set': {
        'portfolioMax': {
          '$max': '$values.totalValue'
        }
      }
    }, {
      '$match': {
        '$expr': {
          '$gte': [
            '$portfolioMax', '$winningValue'
          ]
        }
      }
    }, {
      '$unset': [
        'values', 'portfolioMax'
      ]
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
        'finished': true, 
        'active': false, 
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
};