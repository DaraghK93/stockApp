/// Description ///
// This contains the services for the stock routes.
// These services are functions that contain any data processing.
// Placed here as they are reusable between routes. 
var moment = require('moment')
var axios = require('axios').default;
const Stock = require('../models/stock.model')

function getStockPriceData (stocks) {
    // this function allows the user to get the weekly, monthly and yearly data for a stock
    const daily_prices = stocks[0].prices
    const weekly_prices = stocks[0].prices
    const monthly_prices = stocks[0].prices
    const yearly_prices = stocks[0].prices

    // Use moment - npm i 
    const start_Date_week = moment( moment().subtract(1, 'week') ).format("YYYY-MM-DD")
    const start_Date_month = moment( moment().subtract(1, 'month') ).format("YYYY-MM-DD")
    const start_Date_year = moment( moment().subtract(1, 'year') ).format("YYYY-MM-DD")

    // code taken from Borislav Hadzhiev
    // https://bobbyhadz.com/blog/javascript-get-all-dates-between-two-dates#:~:text=To%20get%20all%20of%20the%20dates%20between%202%20dates%3A&text=Copied!,(date))%3B%20date. 
    function getDatesInRange(startDate, endDate) {
        // the below function will create an array of dates from today back one month
        const date = new Date(startDate.getTime())
        
    
        const dates = []
    
        while (date <= endDate) {
        new_Date = new Date(date)
        // the three lines below will put the dates in the format needed to extract the data
        var year = new_Date.toLocaleString("en-IE", { year: "numeric" });
        var month = new_Date.toLocaleString("en-IE", { month: "2-digit" })
        var day = new_Date.toLocaleString("en-IE", { day: "2-digit" });
        // the date will be added to the array using .push()
        dates.push(year + "-" + month + "-" + day);
        date.setDate(date.getDate() + 1);
        }
        return dates
    }
    var formattedTimeArray = []
    const startTime = moment()
    const startTimesMoment = new Date(startTime)
    let showDate
    if (startTimesMoment.getDay() === 6){
      // checks if today is Saturday and instead sets it to 11pm on Friday (the last time the lambda runs)
      showDate = moment(startTimesMoment).subtract(1, "days").set({hour:23,minute:0,second:0,millisecond:0})
    }
    else if (startTimesMoment.getDay() === 0){
      // checks if today is Sunday and instead sets it to 11pm on Friday (the last time the lambda runs)
      showDate = moment(startTimesMoment).subtract(2, "days").set({hour:23,minute:0,second:0,millisecond:0})
    }
    else {
      showDate = moment(startTimesMoment)
    }
    const remainder = 20 - (showDate.minute() % 20)
    const datestart = moment(showDate).add(remainder, "minutes")
    const oneDayTimes = timeOneDay(datestart)
    const standardFormattingDay = oneDayTimes

    function timeOneDay(datestart) {
      // this function gets 20 min intervals from start date and time back to yesterday at the same time
        var formattedTime
        for (i = 0; i < 24*3 + 1; i++) { //fill in all of the hours
          formattedTime = (moment(datestart).subtract(i*20, "minutes")).format("YYYY-MM-DD[T]HH:mm")
          formattedTimeArray.push(formattedTime) //add to beginning of array
        } //do this for all 24 hours
        return formattedTimeArray
      }

    // Date() gives us the current date, Date(end_Date) interprets the 
    // input date and creates a date that can be used in the function
    const weekStart = new Date(start_Date_week)
    const monthStart = new Date(start_Date_month)
    const yearStart = new Date (start_Date_year)
    const today = new Date();
    
    // run the function to get the range of dates
    dateRangeWeek = getDatesInRange(weekStart, today)
    dateRangeMonth = getDatesInRange(monthStart, today)
    dateRangeYear = getDatesInRange(yearStart, today)



    // create an object for the prices (similar to python dictionary)
    const prices_day = []
    const prices_week = []
    const prices_month = []
    const prices_year = []
    // ***One Day***
    // loop through the date range list and extract the data
    for (var i = 0; i < standardFormattingDay.length; i++) { 
        // the format of the data keys is "YYYY-MM-DDT20:00"
        if(typeof(daily_prices[standardFormattingDay[i]]) != 'undefined'){     
        prices_day.push({"date": standardFormattingDay[i], "price": daily_prices[standardFormattingDay[i]]["Close"] })}}
    // ***One Week***
    // loop through the date range list and extract the data
    for (var i = 0; i < dateRangeWeek.length; i++) { 
        // the format of the data keys is "YYYY-MM-DDT20:00"
        if(typeof(weekly_prices[dateRangeWeek[i]+"T20:00"]) != 'undefined'){     
        prices_week.push({"date": dateRangeWeek[i]+"T20:00", "price": weekly_prices[dateRangeWeek[i]+"T20:00"]["Close"] })}}
        
    // ***One Month***
    // loop through the date range list and extract the data
    for (var i = 0; i < dateRangeMonth.length; i++) { 
        // the format of the data keys is "YYYY-MM-DDT20:00"
        if(typeof(monthly_prices[dateRangeMonth[i]+"T20:00"]) != 'undefined'){
        
        prices_month.push({"date": dateRangeMonth[i]+"T20:00", "price": monthly_prices[dateRangeMonth[i]+"T20:00"]["Close"] })}}
    
    // ***One Year***
    // loop through the date range list and extract the data
    for (var i = 0; i < dateRangeYear.length; i++) { 
        // the format of the data keys is "YYYY-MM-DDT20:00"
        if(typeof(yearly_prices[dateRangeYear[i]+"T20:00"]) != 'undefined'){
        prices_year.push({"date": dateRangeYear[i]+"T20:00", "price": yearly_prices[dateRangeYear[i]+"T20:00"]["Close"] })}}
    
    return [prices_week, prices_month,prices_year, prices_day]

};

// This function makes an API call to the API gateway for the recommender lambda function
const getRecomms = async (userID) => {
    // This sets the body of the request to the userID. 
    var data = '{"userid":' + '"' + userID + '"}';
    try {
      const resp = await axios({
        method: 'GET',
        url: 'https://7hkz8cimzd.execute-api.eu-north-1.amazonaws.com/default/stock-recommender-StockRecommenderFunction-Uh3kMlGONr44',
        data: data
      });
      return resp
    } catch (err) {
      // Error handler
      console.error(err);
    }
  }

const getStockSummary =  (schema, recommended) => {
const stocks =  schema.aggregate([
    { $facet: 
        {
        // agg query for recommended. This queries the DB for the list of ticker symbols "recommended"
        recommend: [{ $match: { symbol: { "$in": recommended } } },
        {
            $project: {
                'symbol': 1,
                'longname': 1, 'exchange': 1, 'logo': 1,
                'daily_change.absoluteChange': 1,
                'daily_change.percentageChange': 1,
                'daily_change.currentprice': 1,
                'esgrating.environment_score': 1
            }
        },
        {$addFields: {"order": {$indexOfArray: [recommended, "$symbol" ]}}},
        {$sort: {"order": 1}}
        ],
        // agg query for top environment
        topEnvironment: [{$match :{}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                    'daily_change.absoluteChange':1,
                                                    'daily_change.percentageChange':1,
                                                    'daily_change.currentprice':1,
                                                    'esgrating.environment_score': 1}},
        {$sort: {'esgrating.environment_score': -1}},
        { $limit: 20}], 
        // agg query for top social
          topSocial: [{$match :{}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                              'daily_change.absoluteChange':1,
                                              'daily_change.percentageChange':1,
                                              'daily_change.currentprice':1,
                                              'esgrating.social_score': 1}},
          {$sort: {'esgrating.social_score': -1}},
        { $limit: 20}],
        // agg query for top governance
        topGovernance: [{$match :{}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                  'daily_change.absoluteChange':1,
                                                  'daily_change.percentageChange':1,
                                                  'daily_change.currentprice':1,
                                                  'esgrating.governance_score': 1}},
        {$sort: {'esgrating.governance_score': -1}},
        { $limit: 20}],
        topGainers: [{$match :{}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                    'daily_change.absoluteChange':1,
                                                    'daily_change.percentageChange':1,
                                                    'daily_change.currentprice':1}},
        {$sort: {'daily_change.percentageChange': -1}},
        { $limit: 20}],
        topLosers: [{$match :{}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                              'daily_change.absoluteChange':1,
                                              'daily_change.percentageChange':1,
                                              'daily_change.currentprice':1}},
        {$sort: {'daily_change.percentageChange': 1}},
        { $limit: 20}],
        Industrials: [{$match :{sector:"Industrials"}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                              'daily_change.absoluteChange':1,
                                              'daily_change.percentageChange':1,
                                              'daily_change.currentprice':1}},
        {$sort: {'daily_change.percentageChange': -1}},
        { $limit: 20}],
        Technology: [{$match :{sector:"Technology"}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                                    'daily_change.absoluteChange':1,
                                                                    'daily_change.percentageChange':1,
                                                                    'daily_change.currentprice':1}},
        {$sort: {'daily_change.percentageChange': -1}},
        { $limit: 20}],
        Financial: [{$match :{sector:"Financial Services"}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                            'daily_change.absoluteChange':1,
                                                            'daily_change.percentageChange':1,
                                                            'daily_change.currentprice':1}},
        {$sort: {'daily_change.percentageChange': -1}},
        { $limit: 20}],
        Healthcare: [{$match :{sector:"Healthcare"}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                            'daily_change.absoluteChange':1,
                                                            'daily_change.percentageChange':1,
                                                            'daily_change.currentprice':1}},
        {$sort: {'daily_change.percentageChange': -1}},
        { $limit: 20}],
        ConsumerCyc: [{$match :{sector:"Consumer Cyclical"}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                            'daily_change.absoluteChange':1,
                                                            'daily_change.percentageChange':1,
                                                            'daily_change.currentprice':1}},
        {$sort: {'daily_change.percentageChange': -1}},
        { $limit: 20}],
        ConsumerDef: [{$match :{sector:"Consumer Defensive"}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                            'daily_change.absoluteChange':1,
                                                            'daily_change.percentageChange':1,
                                                            'daily_change.currentprice':1}},
        {$sort: {'daily_change.percentageChange': -1}},
        { $limit: 20}],
         RealEstate: [{$match :{sector:"Real Estate"}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                            'daily_change.absoluteChange':1,
                                                            'daily_change.percentageChange':1,
                                                            'daily_change.currentprice':1}},
        {$sort: {'daily_change.percentageChange': -1}},
        { $limit: 20}],
      CommunicationServices: [{ $match: { sector: "Communication Services" } }, {
        $project: {
          'symbol': 1, 'longname': 1, 'exchange': 1, 'logo': 1,
          'daily_change.absoluteChange': 1,
          'daily_change.percentageChange': 1,
          'daily_change.currentprice': 1
        }
      },
      { $sort: { 'daily_change.percentageChange': -1 } },
      { $limit: 20 }],
      BasicMaterials: [{ $match: { sector: "Basic Materials" } }, {
        $project: {
          'symbol': 1, 'longname': 1, 'exchange': 1, 'logo': 1,
          'daily_change.absoluteChange': 1,
          'daily_change.percentageChange': 1,
          'daily_change.currentprice': 1
        }
      },
      { $sort: { 'daily_change.percentageChange': -1 } },
      { $limit: 20 }],
      Energy: [{ $match: { sector: "Energy" } }, {
        $project: {
          'symbol': 1, 'longname': 1, 'exchange': 1, 'logo': 1,
          'daily_change.absoluteChange': 1,
          'daily_change.percentageChange': 1,
          'daily_change.currentprice': 1
        }
      },
      { $sort: { 'daily_change.percentageChange': -1 } },
      { $limit: 20 }],
        Utilities: [{$match :{sector:"Utilities"}},{$project: {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                                                            'daily_change.absoluteChange':1,
                                                            'daily_change.percentageChange':1,
                                                            'daily_change.currentprice':1}},
        {$sort: {'daily_change.percentageChange': -1}},
        { $limit: 20}],
      }
  }])
return stocks
}

// gets the game stock summary to display on game stocks page
const gameStockSummary =  (sectors,minErating,minSRating,minGRating) => {

  // match statement, will be the same for them all
  // filters for the min ratings are >= game rating
  // filters for the sectors that are pplayable
  const matchStatement = {'esgrating.environment_score':{$gte:minErating},
                          'esgrating.social_score':{$gte:minSRating},
                          'esgrating.governance_score':{$gte:minGRating},
                          'sector':{$in:sectors}}

  // this decides what fields are included in the response
  // corresponds to the info shown on the ticker cars
  const projectStatement = {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                            'daily_change.absoluteChange':1,
                            'daily_change.percentageChange':1,
                            'daily_change.currentprice':1,
                            'esgrating.environment_score': 1}

                        
  const stocks =  Stock.aggregate([
    { $facet: 
        {
        // agg query for top environment
        topEnvironment: [{$match : matchStatement},
                         {$project: projectStatement },
                         {$sort: {'esgrating.environment_score': -1}},
                         { $limit: 20}], 
        // agg query for top social
        topSocial: [{$match :matchStatement},{$project: projectStatement },
                      {$sort: {'esgrating.social_score': -1}},
                      { $limit: 20}],
        // agg query for top governance
        topGovernance: [{$match :matchStatement},{$project: projectStatement},
                        {$sort: {'esgrating.governance_score': -1}},
                        { $limit: 20}],
        topGainers: [{$match :matchStatement},{$project: projectStatement},
                      {$sort: {'daily_change.percentageChange': -1}},
                      { $limit: 20}],
        topLosers: [{$match :matchStatement},{$project: projectStatement},
                    {$sort: {'daily_change.percentageChange': 1}},
                    { $limit: 20}],
                 
        
      }
  }])
  return stocks
}

// gets the game stock summary to display on game stocks page
const getAllGameStocks =  (sectors,minErating,minSRating,minGRating,pageNumber,pageSize) => {
  const projectStatement = {'symbol': 1,'longname': 1,'exchange':1,'logo':1,
                            'daily_change.absoluteChange':1,
                            'daily_change.percentageChange':1,
                            'daily_change.currentprice':1,
                            'esgrating.environment_score': 1}

  const amountToSkip = pageSize * pageNumber;
  const stocks = Stock.find({'esgrating.environment_score':{$gte:minErating},
    'esgrating.social_score':{$gte:minSRating},
    'esgrating.governance_score':{$gte:minGRating},
    'sector':{$in:sectors}}).select(projectStatement).skip(amountToSkip).limit(pageSize)
                        
  return stocks
}



module.exports = {
    getStockPriceData,
    getStockSummary,
    getRecomms,
    gameStockSummary,
    getAllGameStocks
}