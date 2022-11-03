const mongoose = require('mongoose')
const {Schema} = mongoose

const LeagueSchema = new mongoose.Schema(
    {
      leagueName: { type: String, trim: true, required: true },
      budget: { type: Number, trim: true, required: true},
      leagueType: {type: String, enum: ["timeBased","valueBased"], required: true},
      tradingFee: {type: Number, required: true},
      private: {type: Boolean, required: true},
      leagueAdmin: {type: Schema.Types.ObjectId, ref: 'UserData'}, 
      users: [{type: Schema.Types.ObjectId, ref: 'UserData'}], 
      portfolios: [{type: Schema.Types.ObjectId, ref: 'PortfolioData'}]
    },
    { collection: 'league-data' },

    { timestamps: true },
  )

  module.exports = League = mongoose.model('league', LeagueSchema);