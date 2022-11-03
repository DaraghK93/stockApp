/// Description ///
// This contains the services for the article routes.
// These services call the models and contain any data processing required
// Placed here as they are reusable between routes. 


const Article = require('../models/article.model');

/// cleanCompanyNames ///
// Description:
//      Company names in the database have "inc" or ".com" attached to them
//      News articles dont talk about companies using these names, regex in function removes this
// Inputs:
//      companyName - String value of company name
// Returns:
//      cleanedCompanyName - Company name with "Inc" "Inc," and/or ".com" removed
function cleanCompanyName(companyName){
    try{
        /// For companyName if it contains ".com" or "Inc" or ",Inc" remove it 
        var removeCoportation   = companyName.replace(/(Corporation)/,'')
        var cleanedCompanyName  = removeCoportation.replace(/(Corporation)?(\.)?(com)?(,\s)?(Inc)(.)?/,'')
        return cleanedCompanyName
    }catch{
        throw new Error(`Error has occured in the cleanCompanyName function.\nError details:\n\t${error}`)
    }
}



/// searchNewsArticles ///
// Description:
//  Searches news articles using searchQuerys parameter
//  Inputs:
//      Array of search querys in form  {"key":{$regex:<Regex>,$options: <Options>}}
//  Returns:
//      articles - Array of JSON objects  
const searchNewsArticles = async (searchQuerys) => {
    try{
        const articles = await Article.find({
                $or:searchQuerys
        }).sort({"pubDate":-1})
        return articles
    }catch(error){
        /// Put in custom message will be caught by error handler and displayed in logs 
        throw new Error(`Error has occured in the searchNewsArticles function.\nError details:\n\t${error}`)
    }
}

/// buildSearchQueryForCompany ///
// Inputs:
//      shortname - Companies shortname
//      longname - Companies long name
//      symbol   - Companies stock symbl 
//  Returns:
//      searchQuery - A mongo search query which can be used to get companies info 
const buildSearchQueryForCompany = async (shortname, longname, symbol) => {
    try{
        /// Clean the company names for the search 
        var shortnameNoIncOrCom = await cleanCompanyName(shortname)
        var longnameNoIncOrCom  = await cleanCompanyName(longname)
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
        return searchQuery
    }catch(error){
        throw new Error(`Error has occured in the buildSearchQueryForCompany function.\nError details:\n\t${error}`)
    }
}


/// getCompanySentimentCount ///
// Inputs:
//      searchQuery - A mongo search query which can be used to get companies info 
//  Returns:
//      results - An array containing information on the number of positive, neutral and negative articles in the database 
const getCompanySentimentCount = async (searchQuery) => {
    try{
        /// Query can be updated later if we want to get actual articles not just count 
        const queryResults = await Article.aggregate([
            {$match: 
                    {$or: searchQuery}
            },
            {
                $group:{_id: '$sentiment', count: {$sum: 1}}
            },
            {
                $facet:{
                    Positive:[
                        {
                            $match:{_id:"positive"}
                        },
                        {$project: {"sentiment": "$_id", _id: 0, "count": 1}},
                    ],
                    Negative:[
                        {
                            $match:{_id:"negative"}
                        },
                        {$project: {"sentiment": "$_id", _id: 0, "count": 1}},
                    ],
                    Neutral:[
                        {
                            $match:{_id:"neutral"}
                        },
                        {$project: {"sentiment": "$_id", _id: 0, "count": 1}},
                    ]
                }
            }
        ])
    /// The result is an array, facet command always returns array [{positive:[{count: 2, sentiment: "postive"}]}] ...
    /// There will always be positive, neutral and negative keys in this array however if the key points to empty object it means there are no articles
    /// for that sentiment 
    sentiments = queryResults[0]
    results = []
    for (let key in sentiments){
        if (sentiments[key].length === 0){
            results.push({name:key, value:0 })
        }else{
            results.push({name:key, value:sentiments[key][0].count})
        }
    }
    /// Results will be in the form required for frontend graphs 
    //[
    // { name: 'positive', value: 12 },
    // { name: 'negative', value: 40 },
    // { name: 'neutral', value: 50 }
    //]
    return results 
    }catch(error){
        throw new Error(`Error has occured in the getOverallSentiment function.\nError details:\n\t${error}`)
    }
}




module.exports = {
    cleanCompanyName,
    searchNewsArticles,
    buildSearchQueryForCompany,
    getCompanySentimentCount
}