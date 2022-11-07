const mongoose = require('mongoose')
const {Schema} = mongoose

const LeagueSchema = new mongoose.Schema(
    {
      leagueName: { type: String, trim: true, required: true },
      budget: { type: Number, trim: true, required: true},
      leagueType: {type: String, enum: ["timeBased","valueBased"], required: true},
      private: {type: Boolean, required: true},
      active: {type: Boolean, required: true},
      startDate: {type: Date, required: true },
      endDate: {type: Date},
      sectors: {type: [String]},
      maxDailyTrades: {type:Number, required: true,  },
      tradingFee: {type: Number, required: true},
      minERating: {type: Number, default: 0},
      minSRating: {type: Number, default: 0},
      minGRating: {type: Number, default: 0},
      leagueAdmin: {type: Schema.Types.ObjectId, ref: 'UserData'}, 
      users: [{type: Schema.Types.ObjectId, ref: 'UserData'}], 
      portfolios: [{type: Schema.Types.ObjectId, ref: 'PortfolioData'}]
    },
    { collection: 'leagues' },

    { timestamps: true },
  )

  module.exports = League = mongoose.model('league', LeagueSchema);