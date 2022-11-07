const mongoose = require('mongoose')
const getParamFromAWS = require("../utils/awsParamStore")

/// connectDB ////
//  Description:
///     This will get a connection to the datbase. If the environment variable 
///     ENVIRONMENT is "dev" then it will be a local connection, if it is "prod" then it is
///     a production connection 
const connectDB = async () => {
    try {
        /// mongoURI will either be local or prod connection uri 
        var mongoURI = ''
        /// If in dev use local db URI stored in environment var else get prod db secret stored in AWS 
        if (process.env.ENVIRONMENT === "dev"){
            mongoURI = process.env.MONGO_URI
        }else if(process.env.ENVIRONMENT === "prod"){
            mongoURI = await getParamFromAWS("MONGO_URI")
        }
        // Connect to the datbase 
        const conn = await mongoose.connect(mongoURI)
        console.log(`Mongo DB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB