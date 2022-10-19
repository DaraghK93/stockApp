const mongoose = require('mongoose')

const UserPortfolioSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, required: true, unique: true },
    portfolios: { type: PortfolioSchema }
  },
  { collection: 'portfolio-data' },
  // Timestamps used to create createdAt and updatedAt fields in the model that allows us to track when the entity was created/updated
  { timestamps: true },
)

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

module.exports = mongoose.model('PortfolioData', UserPortfolioSchema)
