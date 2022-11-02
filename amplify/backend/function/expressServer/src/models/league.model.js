const mongoose = require('mongoose')

const LeagueSchema = new mongoose.Schema(
    {
      leadgueName: { type: String, trim: true, required: true },
      budget: { type: String, trim: true, required: true},
      leagueType: {type: String, enum: ["timeBased","valueBased"], required: true},
      tradingFee: {type: Number, required: true},
      users: [{type: mongoose.Schema.Types.ObjectID, ref: 'UserData'}],
      portfolios: [{type: mongoose.Schema.Types.ObjectID, ref: 'PortfolioData'}]
    },
    { collection: 'league-data' },

    { timestamps: true },
  )

  module.exports = League = mongoose.model('league', LeagueSchema);