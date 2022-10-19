const mongoose = require('mongoose')

const PortfolioSchema = mongoose.Schema(
  {
    portfolioName: { type: String, trim: true, required: true },
    remainder: { type: String, trim: true},
    holdings: {type: Object},
    dateCreated: {type: String, trim: true},
    totalValue: {type: String, trim: true, required: true},
    transactions: {type: Object},
    marketOrders: {type: Object},
    valueHistory: {type: Object}
  }
)

module.exports = mongoose.model('PortfolioData', PortfolioSchema)
