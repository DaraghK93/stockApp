/// Description ///
//  This file holds all the controllers for the route /api/newsarticles

/// Imports ///
// 
const Article = require('../models/article.model');

const { addTweet, getTweets } = require('../controllers/tweetController');


const getNewsArticles = async (req, res, next) => { 
    try{
        const symbol       = req.query.symbol
        const shortname    = req.query.shortname
        const longname     = req.query.longname
        const longnamesort = req.query.longnamesort 
        /// if these querys are undefined just return all articles
        if (typeof symbol === 'undefined' && typeof shortname === 'undefined' && typeof longname === 'undefined'){
            const articles = await Article.find({});
            res.json(articles)
        }else{
            /// For the longname and shortname if it contains ".com" or "Inc" or ",Inc"
            var shortnameNoIncOrCom  = shortname.replace(/(\.)?(com)?(,\s)?(Inc)(.)?/,'')
            var longnameNoIncOrCom   = longname.replace(/(\.)?(com)?(,\s)?(Inc)(.)?/,'')


            /// For longnamesort remove comInc, it is on some internet companys 
            //console.log(shortnameNoInc)
            const articles = await Article.find({
                $or:[
                    /// Official company name 
                    {"headline":{$regex:shortname,$options: 'i'}},
                    {"description":{$regex:longname,$options: 'i'}},
                    /// shortname no Inc or .com 
                    {"headline":{$regex:shortnameNoIncOrCom,$options: 'i'}},
                    {"description":{$regex:shortnameNoIncOrCom,$options: 'i'}},
                    // longname no Inc or .com
                    {"headline":{$regex:longnameNoIncOrCom,$options: 'i'}},
                    {"description":{$regex:longnameNoIncOrCom,$options: 'i'}},
                    // Stock Symbol 
                    {"headline":{$regex:symbol,$options:'i'}},
                    {"description":{$regex:symbol,$options:'i'}}
            ]     
        })
            res.json(articles)
        }
       
        
    }catch (err) {
        console.error(err.message);
        res.errormessage = 'Server error';
        return next(err);
  }
}


module.exports = {
    getNewsArticles
};