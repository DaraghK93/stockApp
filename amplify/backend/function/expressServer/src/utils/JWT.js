/// Description:
///     This file constans a function to get the JWT Secret
const getParamFromAWS = require('./awsParamStore');


/// getSecret ///
// Descripton:
//      This function gets the JWT secret either from a .env file or AWS paramter store
const getJWTSecret = async () => {
    try{
        /// jwtSecret - This will be either obtained from AWS or local env file 
        var jwtSecret = '' 
        if (process.env.ENVIRONMENT === "dev"){
            /// Development environment get it from .env file 
            jwtSecret = process.env.JWT_SECRET
        }else if(process.env.ENVIRONMENT === "prod"){
            /// Production environment, get it from AWS Param store 
            jwtSecret = await getParamFromAWS("JWT_SECRET")
        }
        return jwtSecret
    }catch(error){
        console.log("ERROR: Cannot get secret cannot get the JWT_SECRET")
        console.log(error)
    }
}

module.exports = getJWTSecret;