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
                                  // find all leagues that are valuebased and ongoing
                                    '$match': {
                                      'finished': false, 
                                      'leagueType': 'valuebased'
                                    }
                                  }, {
                                    // match on the foreign key portfolioID
                                    // get the total values of all portfolios from the view
                                    '$lookup': {
                                      'from': 'portfolioTotalValue', 
                                      'localField': 'portfolios', 
                                      'foreignField': '_id', 
                                      'as': 'values'
                                    }
                                  }, {
                                    // set which fields to display, add new field max portfolio value
                                    '$project': {
                                      'leagueName': 1, 
                                      'active': 1, 
                                      'finished': 1, 
                                      'winningValue': 1, 
                                      'portfolioMax': {
                                        '$max': '$values.totalValue'
                                      }
                                    }
                                  }, {
                                    // get the leagues where the max portfolio value is greater than
                                    // the league  winning value
                                    '$match': {
                                      '$expr': {
                                        '$gte': [
                                          '$portfolioMax', '$winningValue'
                                        ]
                                      }
                                    }
                                  }, {
                                    // set active to false and finished to true
                                    '$set': {
                                      'finished': true, 
                                      'active': false
                                    }
                                  }, {
                                    // remove portfolio max field so it's not added to the document
                                    '$unset': 'portfolioMax'
                                  }, {
                                    // merge these changes (changes to active and finished) into
                                    // the leagues collection, matching on leagueID
                                    '$merge': {
                                      'into': 'leagues', 
                                      'on': '_id'
                                    }
                                  }
                                ])
                              }