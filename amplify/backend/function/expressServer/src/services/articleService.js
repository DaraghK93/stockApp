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
        var cleanedCompanyName  = companyName.replace(/(\.)?(com)?(,\s)?(Inc)(.)?/,'')
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
        })
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

const getOverallSentiment = async (searchQuery) => {
    try{
        //const articles = await Article.aggregate([
        //{
        //    $match:{ $or: searchQuery}},
        //    {$group:{_id: '$sentiment', count: {$sum: 1}}}
        //])

        const articles = await Article.aggregate([

            {
                $facet:
                    {
                        positive: [
                            {$match:
                                { $or: searchQuery}},
                            
                            
                        
                        ]
                    }
            }
        ])
        console.log(articles)

    }catch(error){
        throw new Error(`Error has occured in the getOverallSentiment function.\nError details:\n\t${error}`)
    }
}




module.exports = {
    cleanCompanyName,
    searchNewsArticles,
    buildSearchQueryForCompany,
    getOverallSentiment
}