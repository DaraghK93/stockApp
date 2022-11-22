/// Description:
///     This file contains a function to get the HOST for emailing

/// getSecret ///
// Descripton:
//      This function gets the host either from a .env file or is the live site URL
const getHost = async () => {
  try {
    /// host - This will be either obtained from AWS or local env file
    var HOST = '';
    if (process.env.ENVIRONMENT === 'dev') {
      /// Development environment get it from .env file
      HOST = process.env.HOST;
    } else if (process.env.ENVIRONMENT === 'prod') {
      /// Production environment, hard coded for now until I can get the URL dynamically
      HOST = await getParamFromAWS('HOST');
    }
    return HOST;
  } catch (error) {
    console.log('ERROR: Cannot get HOST');
    console.log(error);
  }
};

module.exports = getHost;
