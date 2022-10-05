const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
  {
    // exchange: {type: String, trim: true, required: true},    *INCLUDE THIS*
    symbol: {type: String,required: true},
    // shortname: {type: String, trim: true,required: true},
    // longname: {type: String, trim: true,required: true},  *******
    // sector: {type: String, trim: true,required: true},    *******
    // industry: {type: String, trim: true,required: true},
    currentprice: {type: String,required: true}
    // marketcap: {type: String, trim: true,required: true},  
    // ebitda: {type: String, trim: true,required: true},
    // revenuegrowth: {type: String, trim: true,required: true},
    // city: {type: String, trim: true,required: true},
    // state: {type: String, trim: true,required: true},
    // country: {type: String, trim: true,required: true},
    // fulltimeemployees: {type: String, trim: true,required: true},
    // businessummary: {type: String, trim: true,required: true},
  }
);

/* 
  ESG rating
  24 Percentage change
  Absolute change
  Revenue growth
  Make a search by stock name
  Search by company name
  Filter for stocks (by ESG etc etc)
*/

module.exports = Stock = mongoose.model('stock', stockSchema);
