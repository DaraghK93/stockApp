### Description ###
#   This file is the main entry point to the lambda function 
#   The function parses the RSS feeds for news articles 
#   Classifies the sentiment of these articles as either positive, neutral or negative
#   Then sends the data to the database 

### Imports ###
import json
import os 



### Directory Setup ###
# For relative imports use the directory where script is running 
# This will change dynamically when running locallly or on AWS Lambda 
dir_path = os.path.dirname(os.path.realpath(__file__))


### ReadSources ###
## Description:
#   This function reads in a supplied JSON file of RSS sources and returns a dictionary
## Inputs:
#   file - Path to JSON file 
def readSources(file):
    try:
        f = open(file)
        content = json.load(f)
        f.close()
        return content
    except Exception as e:
        print(f'Error occured in trying to read file supplied "{file}"\nException message {e}')



### Handler ###
def handler(event, context):
    ## Step One ###
    #   Parse the RSS feeds 
    rssSources = readSources(f'{dir_path}\lib\RSSSources.json')
    print(rssSources)
    
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