/// Description:
//      This file holds funtions to get a paramter from param store on AWS 
//      Functions used to get both the database URI and JWT token secret 
const aws = require('aws-sdk');

/// getParamFromAWS ///
// Description:
//      Gets a paramter stored within AWS Parameter store 
//  Inputs:
//      paramName - The name of the paramter to get 
const getParamFromAWS = async (paramName) => {
    try{
        // Initiate new ssm 
        const ssm = new aws.SSM()
        // Name of param is passed in function 
        var params = {
            Name: paramName,
            WithDecryption: true
        }
        /// Get the parameter 
        const param = await ssm.getParameter(params).promise()
        return param.Parameter.Value
    }catch(error){
        console.log("ERROR: Cannot get paramater from AWS parameter store")
        console.log(error)
    }
}



module.exports = getParamFromAWS;