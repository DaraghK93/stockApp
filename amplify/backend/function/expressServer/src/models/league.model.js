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
            default: true,
            required: true
        },
        active: {
            type: Boolean, 
            required: true,
            default: false
        }, 
        finished: {
            type:Boolean,
            required:true,
            default: false,
        },
        startDate: {
            type: Date, 
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
          unique: true,
          required:true
        },
        image: {
          type: String,
          enum: ["/stock_photo_1.jpg",
                 "/stock_photo_2.jpg",
                 "/stock_photo_3.jpg",
                 "/stock_photo_4.jpg"],
          required: true
        },
        leagueAdmin: {
          type: Schema.Types.ObjectId, 
          ref: 'UserData',
          required:true
        }, 
        users: [{
          type: Schema.Types.ObjectId, 
          ref: 'UserData',
          required:true
        }], 
        portfolios: [{
          type: Schema.Types.ObjectId, 
          ref: 'PortfolioData',
          required:true
        }]
    },
    { collection: 'leagues' },
    { timestamps: true },
  )



  module.exports = League = mongoose.model('league', LeagueSchema);