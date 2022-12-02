const mongoose = require('mongoose')
const {Schema} = mongoose

const HoldingsSchema = new mongoose.Schema(
  {
    portfolioId: {type: Schema.Types.ObjectId, ref: 'portfolioData', required: true},
    stockId: {type: Schema.Types.ObjectId, ref: 'stock', required: true},
    units: {type: Number, trim: true, required: true},
    frozenHoldingsUnits: {type: Number, trim: true}
  },
  { collection: 'holdings' },
  // Timestamps used to create createdAt and updatedAt fields in the model that allows us to track when the entity was created/updated
  { timestamps: true },
)


module.exports = mongoose.model('holdingsData', HoldingsSchema)