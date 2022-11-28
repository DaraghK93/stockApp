/// Description ///
// This contains the services for the stock routes.
// These services are functions that contain any data processing.
// Placed here as they are reusable between routes. 
var moment = require('moment')
const Stock = require('../models/stock.model')

function getStockPriceData (stocks) {
    // this function allows the user to get the weekly, monthly and yearly data for a stock
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
        const date = new Date(startDate.getTime());
    
        const dates = []
        const dates_no_year = []
    
        while (date <= endDate) {
        new_Date = new Date(date)
        // the three lines below will put the dates in the format needed to extract the data
        var year = new_Date.toLocaleString("default", { year: "numeric" });
        var month = new_Date.toLocaleString("default", { month: "2-digit" });
        var day = new_Date.toLocaleString("default", { day: "2-digit" });
        // the date will be added to the array using .push()
        dates.push(year + "-" + month + "-" + day);
        dates_no_year.push(day + "/" + month)
        date.setDate(date.getDate() + 1);
        }
        return [dates, dates_no_year];
    }
    // Date() gives us the current date, Date(end_Date) interprets the 
    // input date and creates a date that can be used in the function
    const weekStart = new Date(start_Date_week)
    const monthStart = new Date(start_Date_month)
    const yearStart = new Date (start_Date_year)
    const today = new Date();
    
    // run the function to get the range of dates
    dateRangeWeek = getDatesInRange(weekStart, today)[0]
    dateRangeMonth = getDatesInRange(monthStart, today)[0]
    dateRangeYear = getDatesInRange(yearStart, today)[0]


    // get dates in format DD/MM for the graphs
    dateRangeWeekNoYear = getDatesInRange(weekStart, today)[1]
    dateRangeMonthNoYear = getDatesInRange(monthStart, today)[1]
    dateRangeYearNoYear = getDatesInRange(yearStart, today)[1]

    // create an object for the prices (similar to python dictionary)
    const prices_week = []
    const prices_month = []
    const prices_year = []

    // ***One Week***
    // loop through the date range list and extract the data
    for (var i = 0; i < dateRangeWeek.length; i++) { 
        // the format of the data keys is "YYYY-MM-DDT20:00"
        // console.log(monthly_prices[date_range[i]+"T20:00"])
        if(typeof(weekly_prices[dateRangeWeek[i]+"T20:00"]) != 'undefined'){     
        prices_week.push({"date": dateRangeWeekNoYear[i], "price": weekly_prices[dateRangeWeek[i]+"T20:00"]["Close"] })}}
        
    // ***One Month***
    // loop through the date range list and extract the data
    for (var i = 0; i < dateRangeMonth.length; i++) { 
        // the format of the data keys is "YYYY-MM-DDT20:00"
        // console.log(monthly_prices[date_range[i]+"T20:00"])
        if(typeof(monthly_prices[dateRangeMonth[i]+"T20:00"]) != 'undefined'){
        
        prices_month.push({"date": dateRangeMonthNoYear[i], "price": monthly_prices[dateRangeMonth[i]+"T20:00"]["Close"] })}}
    
    // ***One Year***
    // loop through the date range list and extract the data
    for (var i = 0; i < dateRangeYear.length; i++) { 
        // the format of the data keys is "YYYY-MM-DDT20:00"
        // console.log(monthly_prices[date_range[i]+"T20:00"])
        if(typeof(yearly_prices[dateRangeYear[i]+"T20:00"]) != 'undefined'){
        prices_year.push({"date": dateRangeYearNoYear[i], "price": yearly_prices[dateRangeYear[i]+"T20:00"]["Close"] })}}
    
    return [prices_week, prices_month,prices_year]

};

// const getRecomms = async (stock) => {
//     var axios = require('axios');
//     var data = '{"stock":' + '"' + stock + '"}';
//     console.log("2.1) Data:" + data)
//     var config = {
//         method: 'get',
//         url: 'https://7hkz8cimzd.execute-api.eu-north-1.amazonaws.com/default/stock-recommender-StockRecommenderFunction-Uh3kMlGONr44',
//         headers: {
//             'Content-Type': 'text/plain'
//         },
//         data: data
//     };
//     console.log("2.2) Step before Axios Config")
//     await axios(config)
//         .then(function (response) {
//             let recc_output = response.data.message
//             console.log(JSON.stringify(response.data));
//             //   console.log("Recommender output:", recc_output);
//             console.log("2.3) Recommender output type:", typeof response.data)
//             console.log("2.4) Recommender output.message type:", typeof response.data.message)
//             console.log("2.5) Response.data.message:", response.data.message)
//             console.log("2.6) Response.data.message type:", typeof response.data.message)
//             //   console.log("Recommender output (only stocks):", recc_output[0])
//             return response.data.message
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

const getRecomms = async (stock) => {
    var axios = require('axios').default;
    var data = '{"stock":' + '"' + stock + '"}';
    try {
      const resp = await axios({
        method: 'GET',
        url: 'https://7hkz8cimzd.execute-api.eu-north-1.amazonaws.com/default/stock-recommender-StockRecommenderFunction-Uh3kMlGONr44',
        data: data
      });
      // console.log(resp.data);
      return resp
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

const getStockSummary =  (schema, recommended) => {
const stocks =  schema.aggregate([
    { $facet: 
    // agg query for recommended
    {
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
        }
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

const getStockSummaryRecs = (recommended) => {
    console.log("getStockSummaryRecs input:", recommended)
    console.log("getStockSummaryRecs input type:", typeof recommended)
    console.log("getStockSummaryRecs input length:", recommended.length)
    // const recs = Stock.aggregate([
    //     {
    //         recommended_stocks: [{ $match: { symbol: { $in: recommended } } },
    //         {
                // $project: {
                //     'symbol': 1,
                //     'longname': 1, 'exchange': 1, 'logo': 1,
                //     'daily_change.absoluteChange': 1,
                //     'daily_change.percentageChange': 1,
                //     'daily_change.currentprice': 1,
                //     'esgrating.environment_score': 1
                // }
    //         }
    //         ]
    //     }])
    const recs = Stock.aggregate(
        [{ $match: { symbol: { "$in": recommended } } },
        {
            $project: {
                'symbol': 1,
                'longname': 1, 'exchange': 1, 'logo': 1,
                'daily_change.absoluteChange': 1,
                'daily_change.percentageChange': 1,
                'daily_change.currentprice': 1,
                'esgrating.environment_score': 1
            }
        }
        ]
    )
    console.log(recs)
    console.log(recs.length)
    return recs
}

const getStockSummaryOverall = (schema, recommended) => {
    const stocks = getStockSummary(schema)
    const recs = getStockSummaryRecs(schema, recommended)
    return stocks, recs
}

module.exports = {
    getStockPriceData,
    getStockSummary,
    getRecomms,
    getStockSummaryRecs,
    getStockSummaryOverall
}