const mongoose = require('mongoose')
// const { propfind } = require('../routes/userRoutes')
// // var stockSchema = mongoose.model('stockSchema')


const PortfolioSchema = new mongoose.Schema(
  {
    portfolioName: { type: String, trim: true, required: true },
    remainder: { type: String, trim: true},
    holdings: [{type: mongoose.Schema.Types.ObjectID, ref: 'holdingsSchema'}],
    dateCreated: {type: String, trim: true},
    totalValue: {type: String, trim: true, required: true},
    transactions: [{type: mongoose.Schema.Types.ObjectID, ref: 'transactionsSchema'}],
    marketOrders: [{type: mongoose.Schema.Types.ObjectID, ref: 'marketOrdersSchema'}],
    valueHistory: [{type: mongoose.Schema.Types.ObjectID, ref: 'dailyValuesSchema'}]
  }
)

const holdingsSchema = mongoose.Schema(
  {
    symbol: {type: String, trim: true},
    unitAmount: {type: Number, trim: true},
  }
)

const transactionsSchema = mongoose.Schema(
  {
    symbol: {type: String, trim: true},
    unitAmount: {type: String, trim: true},
    date: {type: String, trim: true},
    buyOrSell: {type: String, trim: true}
    // two options, buy or sell
  }
)

const marketOrdersSchema = mongoose.Schema(
  {
    symbol: {type: String, trim: true},
    marketOrderType: {type: String, trim: true},
//     // limit order, stop buy etc
    restriction: {type: String, trim: true}
//     // might need to think about how this will work
  }
)

const dailyValueSchema = mongoose.Schema(
  {
    symbol: {type: String, trim: true},
    unitAmount: {type: String, trim: true},
    date: {type: String, trim: true}
//     // two options, buy or sell
  }
)

module.exports = mongoose.model('holdingsSchema', holdingsSchema)
module.exports = mongoose.model('transactionsSchema', transactionsSchema)
module.exports = mongoose.model('marketOrdersSchema', marketOrdersSchema)
module.exports = mongoose.model('dailyValuesSchema', dailyValueSchema)

module.exports = mongoose.model('PortfolioData', PortfolioSchema)
// module.exports = mongoose.model('PortfolioData', PortfolioSchema)
// module.exports = mongoose.model('transactionsSchema', Transactions)
// module.exports = mongoose.model('PortfolioData', PortfolioSchema)
// module.exports = mongoose.model('PortfolioData', PortfolioSchema)
