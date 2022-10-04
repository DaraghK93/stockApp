const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema(
  {
    exchange: {type: String, trim: true, required: true},
    symbol: {type: String, trim: true,required: true},
    shortname: {type: String, trim: true,required: true},
    longname: {type: String, trim: true,required: true},
    sector: {type: String, trim: true,required: true},
    industry: {type: String, trim: true,required: true},
    currentprice: {type: String, trim: true,required: true},
    marketcap: {type: String, trim: true,required: true},
    ebitda: {type: String, trim: true,required: true},
    revenuegrowth: {type: String, trim: true,required: true},
    city: {type: String, trim: true,required: true},
    state: {type: String, trim: true,required: true},
    country: {type: String, trim: true,required: true},
    fulltimeemployees: {type: String, trim: true,required: true},
    businessummary: {type: String, trim: true,required: true},
  }
)

const stock = mongoose.stock('StockData', stockSchema)

module.exports = stock