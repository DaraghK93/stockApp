// this code can be implemented to create the views needed for getting the current value 
// of the holdings. This is needed a number of places in the game.
// Everyone will need to do this to play the game locally.
// *************
// Steps:
// Step 1: When in MongoDB, go to 'holdings' collection and click 'Aggregations'
// Step 2: There are  five different stages that you will need to add. In the first one, 
// choose $lookup from the dropdown menu
// Step 3: In the below code, take everything inside the {} that follows $lookup and paste it in the code section
// Step 4: Click the + button to add another stage
// Step 5: Follow the same process for each stage, $addfields, $addfields, $addfields, $project
// Step 6: Save this as an aggregation for yourself
// Step 7: Click save dropdown and choose 'Create View' and call it holdingsValue

const holdingsView = () => {
    collection.aggregate([
      {
        '$lookup': {
          'from': 'stocks', 
          'localField': 'stockId', 
          'foreignField': '_id', 
          'as': 'result'
        }
      }, {
        '$addFields': {
          'stock': {
            '$arrayElemAt': [
              '$result', 0
            ]
          }
        }
      }, {
        '$addFields': {
          'currentValue': {
            '$multiply': [
              '$units', '$stock.daily_change.currentprice'
            ]
          }, 
          'frozenValue': {
            '$multiply': [
              '$frozenHoldingsUnits', '$stock.daily_change.currentprice'
            ]
          }
        }
      }, {
        '$addFields': {
          'symbol': '$stock.symbol', 
          'longname': '$stock.longname', 
          'logo': '$stock.logo', 
          'currentPrice': '$stock.daily_change.currentprice'
        }
      }, {
        '$project': {
          '_id': 1, 
          'portfolioId': 1, 
          'stockId': 1, 
          'holdings': 1, 
          'units': 1, 
          'currentValue': 1, 
          'currentPrice': 1, 
          'longname': 1, 
          'logo': 1, 
          'symbol': 1, 
          'frozenValue': 1, 
          'frozenUnits': 1
        }
      }
    ])
}
