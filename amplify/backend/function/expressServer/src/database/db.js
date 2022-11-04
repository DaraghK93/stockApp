const mongoose = require('mongoose')
const aws = require('aws-sdk');

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
        console.log(error)
    }
}




//const config = require('config')
//const MONGO_URI = config.get("MONGO_URI")
//
const connectDB = async () => {
    try {
        const mongoURI = await getDBSecret()
        
        //const conn = await mongoose.connect(MONGO_URI)
        console.log(mongoURI)
        
        //console.log(`Mongo DB connected: ${conn.connection.host}`)
        //console.log(Parameters)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB