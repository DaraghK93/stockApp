const mongoose = require('mongoose')
const {Schema} = mongoose

const LeagueSchema = new mongoose.Schema(
    {
        leagueName: { 
            type: String,
            trim: true, 
            required: true 
        }, 
        startingBalance: { 
            type: Number, 
            trim: true, 
            required: true
        }, 
        leagueType: {
            type: String,
            enum: ["timeBased","valueBased"], 
            required: true
        },
        private: {
            type: Boolean, 
            required: true
        },
        active: {
            type: Boolean, 
            required: true
        }, // could we have a trigger that changes this depending on start/end?
        startDate: {
            type: Number, //just changed this to test 
            required: true 
        }, 
        endDate: {
          type: Date
        },
        winningValue: {
          type: Number
        },
        sectors: {
          type: [String], 
          default: [
                    'Basic Materials',
                    'Communication Services',
                    'Consumer Cyclical',
                    'Consumer Defensive',
                    'Energy',
                    'Financial Services',
                    'Healthcare',
                    'Industrials',
                    'Real Estate',
                    'Technology',
                    'Utilities'
        ]},
        maxDailyTrades: {
          type: Number, 
          required: true, 
          default: 10 
        }, 
        tradingFee: {
          type: Number, 
          required: true
        }, 
        minERating: {
          type: Number, 
          default: 0
        },
        minSRating: {
          type: Number, 
          default: 0
        },
        minGRating: {
          type: Number, 
          default: 0
        },
        accessCode: {
          type: String, 
          trim: true,
          unique: true
        },
        leagueAdmin: {
          type: Schema.Types.ObjectId, 
          ref: 'UserData'
        }, 
        users: [{
          type: Schema.Types.ObjectId, 
          ref: 'UserData'
        }], 
        portfolios: [{
          type: Schema.Types.ObjectId, 
          ref: 'PortfolioData'
        }]
    },
    { collection: 'leagues' },
    { timestamps: true },
  )

  module.exports = League = mongoose.model('league', LeagueSchema);