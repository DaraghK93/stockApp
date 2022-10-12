/// Description:
//      Model relates to a document in the articles collection of MongoDB

/// Imports ///
const mongoose = require('mongoose')


/// articleSchema ///
//  All fields required
//  Schema should only be used to get articles, they are scraped in lambda 
const articleSchema = new mongoose.Schema(
    {
        headline:{
            type: String,
            required: true
        },
        source:{
            type: String,
            required: true
        },
        link:{
            type: String,
            required: true,
            unique: true // Domt sstore duplicate articles 
        },
        category:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        pubDate:{
            type: Date,
            required: true
        },
        sentiment:{
            type: String,
            required: true
        }
    },
    {
        collection: 'articles'
    } 
)

module.exports = Article = mongoose.model('article', articleSchema);