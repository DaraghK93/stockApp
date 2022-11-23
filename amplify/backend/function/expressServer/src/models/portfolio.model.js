const mongoose = require('mongoose')
const {Schema} = mongoose

const PortfolioSchema = new mongoose.Schema(
  {
    portfolioName: { type: String, trim: true, required: true },
    remainder: { type: Number, trim: true},
    startingBalance: {type: Number, trim: true, required: true},
    holdings: [{type: Schema.Types.ObjectId, ref: 'holdingsData'}],
    dateCreated: {type: Date, trim: true},
    totalValue: {type: String, trim: true},
    transactions: [{type: Schema.Types.ObjectId, ref: 'transactionsData'}],
    valueHistory: [{date: {type: Date}, value: {type: Number}}],
    // value history would contain the totalValue, pushed to array at the end of each day 
    leagueId: {type: Schema.Types.ObjectId, ref: 'leagues'},
    userId: {type: Schema.Types.ObjectId, ref: 'UserData'},
    tradesToday: {type: Number, default: 0}
  },
  { collection: 'portfolios' },
  // Timestamps used to create createdAt and updatedAt fields in the model that allows us to track when the entity was created/updated
  { timestamps: true },
)


module.exports = mongoose.model('PortfolioData', PortfolioSchema)