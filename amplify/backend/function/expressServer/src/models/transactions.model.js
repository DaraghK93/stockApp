const mongoose = require('mongoose')
const {Schema} = mongoose

const TransactionSchema = new mongoose.Schema(
  {
    portfolioId: {type: Schema.Types.ObjectId, ref: 'portfolioData', required: true},
    stockId: {type: Schema.Types.ObjectId, ref: 'stock', required: true},
    holdings: {type: Schema.Types.ObjectId, ref: 'holdings', required: true},
    units: {type: Number, trim: true, required: true},
    value: {type: Number, trim: true, required: true},
    date: {type: Date, trim: true, required: true},
    buyOrSell: {type: String, enum: ["BUY", "SELL"],trim: true, required: true},
    orderType: {type: String, enum: ["MARKET", "LIMIT"],trim: true, required: true},
    status: {type: String, enum: ["PENDING", "COMPLETED", "CANCELLED"],trim: true},
    tradingFee: {type: Number},
    limitValue: {type: Number}
  },
  { collection: 'transactions' },
  // Timestamps used to create createdAt and updatedAt fields in the model that allows us to track when the entity was created/updated
  { timestamps: true },
)


module.exports = mongoose.model('transactionData', TransactionSchema)