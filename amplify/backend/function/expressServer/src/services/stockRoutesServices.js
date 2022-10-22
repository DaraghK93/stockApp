/// Description ///
// This contains the services for the stock routes.
// These services are functions that contain any data processing.
// Placed here as they are reusable between routes. 
var moment = require('moment')

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
    
        const dates = [];
    
        while (date <= endDate) {
        new_Date = new Date(date)
        // the three lines below will put the dates in the format needed to extract the data
        var year = new_Date.toLocaleString("default", { year: "numeric" });
        var month = new_Date.toLocaleString("default", { month: "2-digit" });
        var day = new_Date.toLocaleString("default", { day: "2-digit" });
        // the date will be added to the array using .push()
        dates.push(year + "-" + month + "-" + day);
        date.setDate(date.getDate() + 1);
        }
        return dates;
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
    const prices_week = []
    const prices_month = []
    const prices_year = []

    // ***One Week***
    // loop through the date range list and extract the data
    for (var i = 0; i < dateRangeWeek.length; i++) { 
        // the format of the data keys is "YYYY-MM-DDT20:00"
        // console.log(monthly_prices[date_range[i]+"T20:00"])
        if(typeof(weekly_prices[dateRangeWeek[i]+"T20:00"]) != 'undefined'){
        
        prices_week.push({"date": dateRangeWeek[i], "price": weekly_prices[dateRangeWeek[i]+"T20:00"]["4. close"] })}}
    
    // ***One Month***
    // loop through the date range list and extract the data
    for (var i = 0; i < dateRangeMonth.length; i++) { 
        // the format of the data keys is "YYYY-MM-DDT20:00:00"
        // console.log(monthly_prices[date_range[i]+"T20:00:00"])
        if(typeof(monthly_prices[dateRangeMonth[i]+"T20:00"]) != 'undefined'){
        
        prices_month.push({"date": dateRangeMonth[i], "price": monthly_prices[dateRangeMonth[i]+"T20:00"]["4. close"] })}}
    
    // ***One Year***
    // loop through the date range list and extract the data
    for (var i = 0; i < dateRangeYear.length; i++) { 
        // the format of the data keys is "YYYY-MM-DDT20:00:00"
        // console.log(monthly_prices[date_range[i]+"T20:00:00"])
        if(typeof(yearly_prices[dateRangeYear[i]+"T20:00"]) != 'undefined'){
        prices_year.push({"date": dateRangeYear[i], "price": yearly_prices[dateRangeYear[i]+"T20:00"]["4. close"] })}}
    
    return [prices_week, prices_month,prices_year]

};


module.exports = {
    getStockPriceData
}