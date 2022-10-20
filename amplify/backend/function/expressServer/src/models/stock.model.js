const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
  {
    exchange: { type: String, trim: true },
    symbol: { type: String, trim: true },
    shortname: { type: String, trim: true },
    longname: { type: String, trim: true },
    sector: { type: String, trim: true },
    industry: { type: String, trim: true },
    prices: { type: Object, trim: true },
    marketcap: { type: String, trim: true },
    ebitda: { type: String, trim: true },
    revenuegrowth: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    fulltimeemployees: { type: String, trim: true },
    businessummary: { type: String, trim: true },
    esgrating: {type:Object}
  },
  { collection: 'sample_stock_data' },
  // Timestamps used to create createdAt and updatedAt fields in the model that allows us to track when the entity was created/updated
  { timestamps: true }
);

module.exports = Stock = mongoose.model('stock', stockSchema);
