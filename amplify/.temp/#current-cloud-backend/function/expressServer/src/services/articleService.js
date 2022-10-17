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

module.exports = {
    cleanCompanyName,
    searchNewsArticles
}