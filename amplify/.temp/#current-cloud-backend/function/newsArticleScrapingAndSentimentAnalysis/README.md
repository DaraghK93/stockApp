# newsArticleScrapingAndSentimentAnalysis
This directory is for the Lambda function ```newsArticleScrapingAndSentimentAnalysis```.
The function performs the scraping of news data from RSS feeds. 

The function will eventually classify each news article into postive, negative or neutral using a pre trained model. 

## Enviroment Variables
This function uses 4 environment variables. If you want to run the script locally you need to create a ```.env``` with the contnent below in the base directory. ***NEVER UPLOAD YOUR .env FILE TO GITHUB***

```
ENVIRONMENT=dev
MONGOURI=mongodb://localhost:27017/
DATABASENAME=test
CRONTIME=30
```
***IF THE SCHEDULE TIME CHANGES FOR THE FUNCTION YOU NEED TO UPDATE CRONTIME***

## Running Locally 
Use the command ```aws mock function``` to run the function locally. 

## Adding New News Sources
The RSS feeds this function scrapes are located in the file ```src/lib/RSSSources.json```. If a new news source is to be added a new entry must be created in this JSON document containing the information below. 

```
"Source": <The Source of the article for example Sky News>,

"Topic": <The Topic of the RSS Feed>,

"URL": <The URL of the RSS Feed>,

"DefaultImage": <The default image to use with the articles in the RSS feed if no image present, this will most likely be the Source thumbnail stored in S3>,

"ImageTag": <RSS feeds use different tags for images. This will change depending upon RSS feeds and is trial and error. Colons are replaced with "_" for example if the RSS tag is <media:thumbnail> then this value will be media_thumbnail>
```

## Triggers 
This function runs on a scheduled trigger executing every 30 minutes. 