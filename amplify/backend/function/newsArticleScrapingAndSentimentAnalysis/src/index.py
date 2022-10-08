### Description ###
#   This file is the main entry point to the lambda function 
#   The function parses the RSS feeds for news articles 
#   Classifies the sentiment of these articles as either positive, neutral or negative
#   Then sends the data to the database 

### Imports ###
import json
import os 
import feedparser
from pprint import pprint



### Directory Setup ###
# For relative imports use the directory where script is running 
# This will change dynamically when running locallly or on AWS Lambda 
dir_path = os.path.dirname(os.path.realpath(__file__))


### ReadSources ###
## Description:
#   This function reads in a supplied JSON file of RSS sources and returns a dictionary
## Inputs:
#   file - Path to JSON file 
## Return
#   contnent - An array of dictionaries containing RSS feeds info 
def readSources(file):
    try:
        f = open(file)
        content = json.load(f)
        f.close()
        return content
    except Exception as e:
        print(f'Error occured in trying to read file supplied "{file}"\nException message {e}')

### getRSSFeed ###
## Description:
#   Calls a get request to the 
def getRSSFeed(url):
    try:
        data = feedparser.parse(url)
        return data
    except Exception as e:
        print(f'Cannot get RSS feed from the URL:{url}.\nException Details:\n{e}')
    #print(f'Title:\t{data.entries[0].title}')
    #print(f'Link:\t{data.entries[0].link}')
    #print(f'Description:\t{data.entries[0].description}')
    #print(f'Date:\t{data.entries[0].published}')
    #print(f'Date Parsed:\t{data.entries[0].published_parsed}')
    #print(f'GUID:\t{data.entries[0].id}')


#def parseRSSFeed()




### Handler ###
def handler(event, context):
    ## Step One ###
    #   Get the feeds source, topic and URL 
    rssSources = readSources(f'{dir_path}\lib\RSSSources.json')
    #   For each spurce URL make a get request to get the feeds data  
    for source in rssSources:
        print("*************************")
        print(source["Source"])
        feedData = getRSSFeed(source["URL"])
        pprint(feedData.entries[0])
    #getRSSFeed(rssSources[0]["URL"])


    ## Step Two ##
    #   Get the features required for machine learning classifier 

    ## Step Three ##
    #   Load in the classifier 

    ## Step Four ##
    #   Classify each news article    

    ## Step Five ##
    #   Log the articles to the database 





    print('received event:')
    print(event)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Hello from your new Amplify Python lambda!')
    }