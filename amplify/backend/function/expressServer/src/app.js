/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
const port = 3001;
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const connectDB = require('./database/db');
// declare a new express app
const app = express();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
// Read in the dotenv file 
require('dotenv').config();
/// Set defualt region 
const AWS = require('aws-sdk');
AWS.config.update({region:'eu-north-1'});


connectDB();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(express.json());

// Enable CORS for all methods

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    // res.send depreciated use sendStatus 
    return res.sendStatus(204);
  }
  next();
});

// app.use(cors());
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/user', require('./routes/portfolioRoutes'));
app.use('/api/stock', require('./routes/stockRoutes'));
app.use('/api/tweet', require('./routes/tweetRoutes'));
app.use('/api/newsarticles',require('./routes/newsArticleRoutes'));
app.use('/api/league',require('./routes/leagueRoutes'));
app.use('/api/auth', require('./routes/auth'));



// Custom Middleware here
app.use(errorHandler);

app.listen(port, function () {
  console.log(`App started on port ${port}`);
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
