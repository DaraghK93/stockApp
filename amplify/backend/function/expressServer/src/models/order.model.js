/// Description:
//      Model relates to a document in the order Book collection of MongoDB

/// Imports ///
const mongoose = require('mongoose')
const {Schema} = mongoose
// const Portfolio = require("./portfolio.model")

// Order Schema //
// this schema is used to create limit orders
// these can be either type buy or type sell
// the order-book collection is checked when the current price of stocks changes
// to see whether the orders can be fulfilled
const orderSchema = new mongoose.Schema(
    {
      portfolioID: { type: Schema.Types.Object, ref: 'PortfolioData' },
      symbol: { type: String, trim: true, required: true},
      limitPrice: {type: Number, required: true},
      quantity: {type: Number, required: true},
      orderType: {type: String, enum: ["buy","sell"], required:true },
    },
    { collection: 'order-book' },
    // Timestamps 
    { timestamps: true },
  )

  module.exports = Order = mongoose.model('order', orderSchema);