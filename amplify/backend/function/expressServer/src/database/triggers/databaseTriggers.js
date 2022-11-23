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
    // active to false, finished to true. ends the league
    return collection.updateMany({ endDateDate: new Date(today) }, {$set:{active:false, finished:true}});
  
  }