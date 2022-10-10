### Description ###
#   This file is the main entry point to the lambda function 
#   The function parses the RSS feeds for news articles 
#   Classifies the sentiment of these articles as either positive, neutral or negative
#   Then sends the data to the database 

### Imports ###
from html import entities
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
        print(f'ERROR:Occured in trying to read file supplied "{file}"\nException message {e}')

### getRSSFeed ###
## Description:
#   Calls a get request to the 
def getRSSFeed(url):
    try:
        data = feedparser.parse(url)
        return data
    except Exception as e:
        print(f'ERROR:Cannot get RSS feed from the URL:{url}.\nException Details:\n{e}')
    


def getImage(article,imageTag,defaultImage):
    """
    Description:
        This function will return the image URL for an article 

    Args:
        article (dict): Dictionary object, in the form of article entry returned from parsed feed. 
        imageTag (string): The tag a particular newspaper uses for its images. 
        defaultImage (string): URL to default image to use if no image is present for this article. 

    Returns:
        string: URL to image to use for this article. 
    """
    try:
        ## Try access image using the tag newpaper used for images 
        image = article.get(imageTag)
        if image is None:
            # No image for article return the defualt image for this newspaper 
            return defaultImage
        else:
            # Image found return this images URL 
            return image[0]['url']
    except Exception as e:
        print(f'ERROR:Cannot access image in article.\nException Details:\n{e}')



### parseRSSFeed ###
## Description:
#   This function parses an RSS feed passed to it    
def getArticles(feed): 
    articles = [] 
    # Just try get the image 
    for article in feed['Articles']:
        # Get the image 
        image = getImage(article,feed['ImageTag'],feed['DefaultImage']) 
        # Get the headline 
        headline = article.title
        # Get the url 
        link = article.link 
        # Get the pub date 
        pubDate = article.published
        # Get the description 
        description = article.description
        # Append article object to articles 
        articles.append({"Headline":headline,"Source":feed['Source'],"Link":link,"Description":description,"Image":image,"PubDate":pubDate})
    return articles

        

### Handler ###
def handler(event, context):
    ## Step One ###
    #   Get the feeds source, topic and URL 
    rssSources = readSources(f'{dir_path}\lib\RSSSources.json')
    #   For each spurce URL make a get request to get the feeds data
    feeds = []
    # Iterate thorugh the sources and get the feeds 
    for source in rssSources:
        feed = getRSSFeed(source["URL"])
        currentFeed = {}
        currentFeed['Articles']      = feed.entries
        currentFeed['Source']        = source['Source']
        currentFeed['Category']      = source['Topic']
        currentFeed['DefaultImage']  = source['DefaultImage']
        currentFeed['ImageTag']      = source['ImageTag']
        feeds.append(currentFeed)
    # Iterate through the feeds and parse the articles  
    articles = []     
    for feed in feeds:
        articles.extend(getArticles(feed))

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