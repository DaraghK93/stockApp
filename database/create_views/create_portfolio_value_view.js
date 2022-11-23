// this code can be implemented to create the views needed for getting the current value 
// of the portfolio. This is needed a number of places in the game.
// Everyone will need to do this to play the game locally.
// *************
// Steps:
// Step 1: When in MongoDB, go to 'portfolio' collection and click 'Aggregations'
// Step 2: There are three different stages that you will need to add. In the first one, 
// choose $lookup from the dropdown menu
// Step 3: In the below code, take everything inside the {} that follows $lookup and paste it in the code section
// Step 4: Click the + button to add another stage
// Step 5: Follow the same process for each stage, $addfields, $project
// Step 6: Save this as an aggregation for yourself
// Step 7: Click save dropdown and choose 'Create View' and call it portfolioValues

const portfoliosView = () => {
    collection.aggregate([
      {
        '$lookup': {
          'from': 'holdingsValue', 
          'localField': '_id', 
          'foreignField': 'portfolioId', 
          'as': 'result'
        }
      }, {
        '$addFields': {
          'totalValue': {
            '$add': [
              '$remainder', {
                '$sum': '$result.currentValue'
              }
            ]
          }
        }
      }, {
        '$project': {
          '_id': 1, 
          'portfolioName': 1, 
          'totalValue': 1, 
          'remainder': 1, 
          'leagueId': 1, 
          'userId': 1, 
          'valueHistory': 1
        }
      }
    ])
}
