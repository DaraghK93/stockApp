const mongoose = require('mongoose')
const {Schema} = mongoose

const PortfolioSchema = new mongoose.Schema(
  {
    portfolioName: { type: String, trim: true, required: true },
    remainder: { type: String, trim: true},
    holdings: [{stock: {type: Schema.Types.ObjectID, ref: 'stock'}, quantity: {type: Number}}],
    dateCreated: {type: String, trim: true},
    totalValue: {type: String, trim: true},
    transactions: [{stock: {type: Schema.Types.ObjectID, ref: 'stock'}, units: {type:Number}, transactionType: {type: String}, date: {type: Date}}],
    valueHistory: [{date: {type: Date}, value: {type: Number}}],
    // value history would contain the totalValue, pushed to array at the end of each day 
    leagues: [{type: Schema.Types.ObjectID, ref: 'leagues'}],
    user: {type: Schema.Types.ObjectID, ref: 'UserData'}
  },
  { collection: 'portfolios' },
  // Timestamps used to create createdAt and updatedAt fields in the model that allows us to track when the entity was created/updated
  { timestamps: true },
)


module.exports = mongoose.model('PortfolioData', PortfolioSchema)