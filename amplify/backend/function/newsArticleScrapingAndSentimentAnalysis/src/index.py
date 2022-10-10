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


def readSources(file):
    """
    Description:
        This function reads in a supplied JSON file of RSS sources and returns a dictionary
    Args:
        file (string): Path to RSSSources.json file. This should be located in the lib directory. 

    Returns:
        content (dict): The contnent of the JSON file supplied in the input. 
    """
    try:
        f = open(file)
        content = json.load(f)
        f.close()
        return content
    except Exception as e:
        print(f'ERROR:Occured in trying to read file supplied\nException message:\n\t{e}')

def getRSSFeed(url):
    """
    Description:
        Gets the RSS feed located at the url input supplied using the feedparser package 

    Args:
        url (string): url of the RSS feed to parse. 

    Returns:
        feed: Dictionary containing the parsed RSS feeds. The keys are the XML tags of the RSS feed. 
    """
    try:
        feed = feedparser.parse(url)
        return feed
    except Exception as e:
        print(f'ERROR:Cannot get RSS feed from the URL:{url}.\nException Details:\n\t{e}')
        return None 
    


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
        print(f'ERROR:Cannot access image in article.\nException Details:\n\t{e}')
        return



### parseRSSFeed ###
## Description:
#   This function parses an RSS feed passed to it    
def getArticles(feed): 
    """
    Description:
        This function parses the articles within an RSS feed.     

    Args:
        feed (dict): Dictionary containing an RSS feed.

    Returns:
        articles (list): A list of dictionary objects. Each object contains a passed article. 
    """
    try:
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
    except Exception as e:
        print(f'ERROR:Occured in the getArticles function.\nException Details:\n\t{e}')
        return
        
    



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
        if feed is not None:
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