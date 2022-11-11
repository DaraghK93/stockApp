/// Description:
///     This file contains a function to get the HOST for emailing

/// getSecret ///
// Descripton:
//      This function gets the host either from a .env file or is the live site URL
const getSendGridAPIKEY = async () => {
  try {
    /// API_KEY - This will be either obtained from AWS or local env file
    var API_KEY = '';
    if (process.env.ENVIRONMENT === 'dev') {
      /// Development environment get it from .env file
      API_KEY = process.env.SENDGRID_API_KEY;
    } else if (process.env.ENVIRONMENT === 'prod') {
      /// Production environment, hard coded for now until I can get the URL dynamically
      API_KEY = await getParamFromAWS('SENDGRID_API_KEY');
      API_KEY = 'https://master.d2l3aeky8jssr5.amplifyapp.com';
    }
    return API_KEY;
  } catch (error) {
    console.log('ERROR: Cannot get API_KEY');
    console.log(error);
  }
};

module.exports = getSendGridAPIKEY;
