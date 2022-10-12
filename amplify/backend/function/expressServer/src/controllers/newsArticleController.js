/// Description ///
//  This file holds all the controllers for the route /api/newsarticles

/// Imports ///
// 
const Article = require('../models/article.model');


const getNewsArticles = async (req, res, next) => { 
    try{
        const symbol    = req.query.symbol
        const shortname = req.query.shortname
        const longname  = req.query.longname
        /// if these querys are undefined just return all articles
        if (typeof symbol === 'undefined' && typeof shortname === 'undefined' && typeof longname === 'undefined'){
            const articles = await Article.find({});
            res.json(articles)
        }else{
            /// For the logname and shortname if it contains "Inc" remove it 
            const shortnameNoInc = shortname.replace(/Inc\./,'')
            const longnameNoInc = longname.replace(/Inc\./,'')
            console.log(shortnameNoInc)
            const articles = await Article.find(
                {"headline":{$regex:shortnameNoInc,$options: 'i'}}
            )
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