const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema(
  {
    exchange: { type: String, trim: true, required: true },
    symbol: { type: String, trim: true, required: true },
    shortname: { type: String, trim: true, required: true },
    longname: { type: String, trim: true, required: true },
    sector: { type: String, trim: true, required: true },
    industry: { type: String, trim: true, required: true },
    currentprice: { type: String, trim: true, required: true },
    marketcap: { type: String, trim: true, required: true },
    ebitda: { type: String, trim: true, required: true },
    revenuegrowth: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    state: { type: String, trim: true, required: true },
    country: { type: String, trim: true, required: true },
    fulltimeemployees: { type: String, trim: true, required: true },
    businessummary: { type: String, trim: true, required: true },
  },
  { collection: 'stock-data' },
  // Timestamps used to create createdAt and updatedAt fields in the model that allows us to track when the entity was created/updated
  { timestamps: true },
)

module.exports = mongoose.model('StockData', stockSchema)