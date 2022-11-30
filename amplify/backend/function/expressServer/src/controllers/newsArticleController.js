/// Description ///
//  This file holds all the controllers for the route /api/newsarticles

/// Imports ///
const articleService = require('../services/articleService');

/// getNewsArticles ///
// Route:
//      Get /api/newsarticles
const getNewsArticles = async (req, res, next) => { 
    try{
        const symbol       = req.query.symbol
        const shortname    = req.query.shortname
        const longname     = req.query.longname
        /// if these querys are undefined just return all articles
        if (typeof symbol === 'undefined' || typeof shortname === 'undefined' || typeof longname === 'undefined'){
            const articles = await Article.find({});
            res.json(articles)
        }else{
            /// For the longname and shortname if it contains ".com" or "Inc" or ",Inc" remove it 
            var shortnameNoIncOrCom = articleService.cleanCompanyName(shortname)
            var longnameNoIncOrCom  = articleService.cleanCompanyName(longname)
            /// Build the search array 
            const searchQuery = [
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
            /// Use the search service 
            var articles = await articleService.searchNewsArticles(searchQuery);
            /// Return the articles 
            res.json(articles)
        }
    }catch (err) {
        console.error(err.message);
        res.status(500)
        res.errormessage = 'Server error in getNewsArticles';
        return next(err);
  }
}


module.exports = {
    getNewsArticles
};