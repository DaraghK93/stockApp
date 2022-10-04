const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
  {
    // exchange: {type: String, trim: true, required: true},
    name: {type: String,required: true},
    // shortname: {type: String, trim: true,required: true},
    // longname: {type: String, trim: true,required: true},
    // sector: {type: String, trim: true,required: true},
    // industry: {type: String, trim: true,required: true},
    price: {type: String,required: true}
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

const model = mongoose.model('StockData', stockSchema)


module.exports = Stock = mongoose.model('stock', stockSchema);