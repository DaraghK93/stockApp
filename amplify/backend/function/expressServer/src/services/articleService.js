/// Description ///
// This contains the services for the article routes.
// These services call the models and contain any data processing required
// Placed here as they are reusable between routes. 


/// cleanCompanyNames ///
const cleanCompanyName = async (companyName) => {
    try{
        /// For companyName if it contains ".com" or "Inc" or ",Inc" remove it 
        var cleanedCompanyName  = companyName.replace(/(\.)?(com)?(,\s)?(Inc)(.)?/,'')
        return cleanCompanyNamee
    }catch{
        console.error("Error in the function cleanCompany name")

    }
}



/// 
const searchNewsArticles = async (searchQuerys) => {
    try{
        const articles = await Article.find({
                $or:searchObject
        })
        return articles
    }catch{
        console.log("ERROR")
    }
}


module.exports = {
    cleanCompanyName,
    searchNewsArticles
};