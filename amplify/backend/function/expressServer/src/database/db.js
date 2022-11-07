const mongoose = require('mongoose')
const aws = require('aws-sdk');

/// getDBSecret ///
// Description:
///     This gets the database mongo uri stored in aws
///     never store the production database uri anywhere
///     this will work locally but really should be using local db when testing 
/// Returns:
//      mongoURI - Connection string for the MongoDB database 
const getDBSecret = async () => {
    try{
        // Initiate new ssm 
        const ssm = new aws.SSM()
        // Name of param is MongoURI 
        var params = {
            Name: 'MONGO_URI',
            WithDecryption: true
        }
        /// Get the parameter 
        const mongoURI = await ssm.getParameter(params).promise()
        return mongoURI.Parameter.Value
    }catch(error){
        console.log("ERROR: Cannot get secret cannot get MONGO_URI from aws ssm")
        console.log(error)
    }
}



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
            mongoURI = await getDBSecret()
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