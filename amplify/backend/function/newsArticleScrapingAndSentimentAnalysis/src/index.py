### Description ###
#   This file is the main entry point to the lambda function 
#   The function parses the RSS feeds for news articles 
#   Classifies the sentiment of these articles as either positive, neutral or negative
#   Then sends the data to the database 

### Imports ###
import json
import os 
import feedparser
import boto3 
import pymongo
from pymongo.errors import DuplicateKeyError
from datetime import datetime
from datetime import timedelta
from time import mktime
from bs4 import  BeautifulSoup
import pickle
import csv
from statistics import mean
import nltk 

### Directory Setup ###
# For relative imports use the directory where script is running 
# This will change dynamically when running locallly or on AWS Lambda 
dir_path = os.path.dirname(os.path.realpath(__file__))

### NLTK Data ###
# NLTK reads its data from download files from a directory on local machine 
# like the location C:\Users\<USER>\nltk_data\
# This wont be present on the cloud but can tell nltk where to look for it by uploading data to lambda function 
nltk.data.path.append(f'{dir_path}/nltk_data')
from nltk.tokenize import RegexpTokenizer
from nltk.sentiment import SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()


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


def checkArticleTime(articleTime,cronMinsSchedule):
    """
    Description:
      This function checks the time inputted and sees if it less than the time now minus the croneTime.
      The cronTime is the time the function is run every X mins. 
      If the article should be used if would have been published since he last scrape.
      i.e between the time now - the cron time. 

    Args:
        articleTime (time.struct_time): A time.stuct_time object, this is the format the feedparsers uses. 
        cronMinsSchedule (float): A floating point number representing the minutes the lambda function runs. Should be obtained from enviroment variable CRONTIME.

    Returns:
        (BOOL): True if the article should be used. False if the article should not be used. 
    """
    # Get the time now 
    now = datetime.now()
    # The last scraped time is the time the cronjon was last run 
    lastScrapeTime = now - timedelta(minutes=cronMinsSchedule)
    # Convert the article time to a datetime stamp 
    # If the time article was publised at time which is greateer than last scraped time then it should be used
    if articleTime > lastScrapeTime:
        return True
    else:
        # Article will have been gotten fom previous scrapes 
        return False
   
def checkArticleFormat(article):
    """
    Description:
        Checks an article object to ensure all required fields are in the article.     

    Args:
        article (dictionary): An article object parsed from an RSS feed. 

    Returns:
        (Bool): True if required fields are present. False if required fields are not present. 
    """
    if ('title' in article) and ('link' in article) and ('published' in article) and ('description' in article):
        return True
    else:
        return False


def getReutersDescription(html):
    """
    Description:
        Reuters use two HTML paragraphs for there description. 
        Needs further processing as dont want <p> tags in database only plain text.

    Args:
        html (string): The string conataing an article description with 2 <p> tags. 

    Returns:
        description(string): The plain text description for a reuters article with no html tags. 
    """
    try:
        # Parse the html 
        soup = BeautifulSoup(html,features="html.parser")
        # Find all the p tags 
        tags = soup.find_all('p')
        # Get the second HTML p tag, format it as plain text.
        description = tags[1].get_text()
        return description
    except Exception as e:
        print(f'ERROR:Occured in the removeHTMLTagsReutersDescription function.\nException Details:\n\t{e}')
        return


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
        time = float(os.environ['CRONTIME'])
        # Just try get the image 
        for article in feed['Articles']:
            # Check first if the article has all the required fields 
            if checkArticleFormat(article):
                # Check the time of the article
                parsedPubDate = article.published_parsed
                parsedPubDate  = datetime.fromtimestamp(mktime(parsedPubDate)) # Converted to datetime here as this is what Mongo works with
                # If the article was not obtained from the previous scrape then parse it 
                if checkArticleTime(parsedPubDate,time):
                    # Get the image 
                    image = getImage(article,feed['ImageTag'],feed['DefaultImage']) 
                    # Get the headline 
                    headline = article.title
                    # Get the url 
                    link = article.link 
                    # Get the description 
                    description = article.description
                    # Reuters format there description in multiple HTML tags, needs further processing 
                    if feed["Source"] == "Reuters" and article.summary_detail.type =="text/html":
                        description = getReutersDescription(description)
                    # Append article object to articles TODO - Change the hardcoded sentiment, will be updated next week when sentiment due 
                    articles.append({"headline":headline,"source":feed['Source'],"link":link,"category":feed['Category'],"description":description,"image":image,"pubDate":parsedPubDate,"sentiment":"Neutral"})
        return articles
    except Exception as e:
        print(f'ERROR:Occured in the getArticles function.\nException Details:\n\t{e}')
        return
        

def getSecret(secretName,region="eu-north-1"):
    """
    Description:
        This function is used to get a secret from the parameter store in AWS. 

    Args:
        secretName (string): The name of the secret found in the parameter store. 
        region (string): The region the secret is stored in, default to eu-north-1. 

    Returns:
        response (dict): Dictonary object with the secret name under "Name" key and value under "Value" key
    """ 
    client = boto3.client('ssm',region)
    try:
        response = client.get_parameter(
            Name=secretName,
            WithDecryption=True
        )
        return response
    except Exception as e:
        print(f'ERROR:Could not get secret in getSecret function.\nException Details:\n\t{e}')


def getMongoConnection(URI):
    """
    Description:
        Gets a client connection to MongoDB

    Args:
        URI (string): A connection string for mongo Database 

    Returns:
        client(MongoClient): MongoClient object which can be used to execute commands on the database. 
    """
    client = pymongo.MongoClient(URI)
    if client is None:
        print(f'ERROR:Could not connect to MongoDB, client obeject is none')
    else:
        return client


def writeArticlestoDatabase(client,articles):
    """
    Description:
        Logs the articles to the database 
    Args:
        articles (list): List of JSON objects containing articles 

    Returns:
        _type_: _description_
    """
    db = client[os.environ["DATABASENAME"]]
    try:
        db.articles.insert_many(articles, ordered=False)
    except pymongo.errors.BulkWriteError as e:
        print(f'WARNING:Duplicate Articles detected, only one copy of articles inserted into database.')
    except Exception as e:
        print(f'ERROR:Could not insert articles into database.\nException Details:\n\t{e}')

def readWordFileToList(file):
    """
    Takes in file name for words list in csv format and returns qwords in one dimensional array. 
    It assumes the words file has two columns, column headers and the first column contains the words. 

    Args:
        file (String): The path of the file to read

    Returns:
        words (List): One dimensional list of words. 
    """
    try:
        words = [] 
        with open(file,"r") as wordFile:
            csvReader = csv.reader(wordFile)
            # Skip the header in first lin
            next(csvReader)
            for line in csvReader:
                # 0th eleeent as the word is here, occurences in 1st element 
                words.append(line[0])
        return words
    except Exception as e:
        print(f'ERROR:Occured in the readWordFileToList function.\nException Details:\n\t{e}')


def loadClassifier(file):
    """
    Loads in a pickle file containing the machine learning classifier.

    Args:
        file (String): The path to the classifier. 

    Returns:
        (SklearnClassifier or NLTKClassifier): The classifier which can be used to classify news headlines. 
    """
    try:
        classifierFile = open(file,"rb")
        classifier = pickle.load(classifierFile)
        classifierFile.close()
        return classifier
    except Exception as e:
        print(f'ERROR:Occured in the loadClassifier function.\nException Details:\n\t{e}')

def convertListToLowerCase(wordsList):
    """
    Converts a list of words to lower case.

    Args:
        wordsList (List): List of strings. 

    Returns:
        wordsLower(List): A list of strings converted to lower case
    """
    try:
        wordsLower = []
        for word in wordsList:
            wordsLower.append(word.lower())
        return wordsLower
    except Exception as e:
        print(f'Error in cinverting words to lower case in function convertListToLowerCase.\n Exception Details {e}')

def getPolarityScore(sentence):
    """
    Calculates polarity scores using NLTK's sentiment analyiser.

    Args:
        sentence (String): Sentence string to calculate polarity of. 

    Returns:
        scores (dict): A dictionary with the keys 'neg', 'neu', 'pos' and 'compound'
    """
    try:
        scores = sia.polarity_scores(sentence)
        return scores
    except Exception as e:
        print(f'Error in calculating polarity scores in function getPolarityScore.n\nException details\n{e}' )

def tokenize(headline):
    """
    Tokenizes and individual headline. Headlines also converted to lower case in this process. 

    Args:
        headline (String): A string representing a headline 

    Returns:
        tokens(List): List of strings, each element is a word in the headline.
    """
    try:
        # Only match words not symbols 
        tokenizer = RegexpTokenizer(r'\w+')
        tokens = tokenizer.tokenize(headline)
        tokens = [t.lower() for t in tokens]
        return tokens 
    except Exception as e:
        print(f'Error in tokenizing headline in function tokenize .\nException details\n{e}')


def getWordCount(sentence,listOfWords):
    """
    Gets the word count of certain words appearing in sentence. 

    Args:
        sentence (String): The sentence to search in 
        listOfWords (List): The words to search for

    Returns:
        wordCount(Int): Integer representing the word count. 
    """
    try:
        wordCount = 0
        # Make sure words are tokenized and lower case 
        words = tokenize(sentence)
        # Make sure words list is lower case, will already be tokenized as its list 
        wordsList = convertListToLowerCase(listOfWords)
        for word in words:
            if word.lower() in wordsList:
                wordCount+=1
        return wordCount
    except Exception as e:
        print(f'Error in getting word count in the function getWordCount.\nException details:\n{e}')

def extractFeatures(headline,posWords,negWords,neuWords=False):
    """
    This function uses other functions to extract features of an inputted headline. 
    The result of this function will be a dictonary object with the feature name as the key and value of that feature as the value. 

    Args:
        headline (String): The headline string to generate features for
        posWords (List): A positive words list to use in counting the positive words in the headline 
        negWords (List): A negative words list to use in counting the negative words in the headline. 
        neuWords (List): Optional a neutral words list to use in counting the negative words in the headline. 

    Returns:
        features(dict): Dictionary where the keys are the feauture names. 
    """
    try:
        posWordCount   = 0 
        negWordCount   = 0 
        neuWordCount   = 0 
        compoundScores  = list()
        positiveScores = list()
        negativeScores = list()
        neutralScores  = list()
        features       = {}
        # Do it by sentence as there could be multiple sentences in a headline with different polarity scores 
        for sentence in nltk.sent_tokenize(headline):
            # Update the positive and negative word count 
            posWordCount   += getWordCount(sentence,posWords)
            negWordCount   += getWordCount(sentence,negWords)
            if neuWords: neuWordCount  += getWordCount(sentence,neuWords)
            # Get the polarity score of the sentence 
            polarityScores = getPolarityScore(sentence)
            compoundScores.append(polarityScores["compound"])
            positiveScores.append(polarityScores["pos"])
            negativeScores.append(polarityScores["neg"])
            neutralScores.append(polarityScores["neu"])
        
        # Calculate the mean of the headlines polarity scores, +1 to meanCompund as some nltk models wont work with negative 
        features["meanCompound"] = mean(compoundScores)+1
        features["meanPositive"] = mean(positiveScores)
        features["meanNegative"] = mean(negativeScores)
        features["meanNeutral"]  = mean(neutralScores)

        # Add the word count to the features 
        features["posWordCount"] = posWordCount
        features["negWordCount"] = negWordCount
        if neuWords: features["neuWordCount"] = neuWordCount
        return features
    except Exception as e:
        print(f'Error in extraing features in function extractFeatures.\nException details:\n{e}')

### Handler ###
def handler(event, context):
    try:
        ## Step One ###
        #   Get the feeds source, topic and URL 
        rssSources = readSources(f'{dir_path}/lib/RSSSources.json')
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

        ## Step Two - Load in the classifier  ##
        # This is the trained classifier used to classify the sentiment of a headline 
        classifierName = "NaiveBayesClassifier.pickle"
        classifier = loadClassifier(f'{dir_path}/lib/{classifierName}')

        ## Step Three - Featrue extraction and prediction ##
        #   Get the features required for machine learning classifier 
        #   Then make the prediction 
        # Read in the word dictionaries 
        negativeWords = readWordFileToList(f'{dir_path}/lib/negativeWords.csv')
        positiveWords = readWordFileToList(f'{dir_path}/lib/positiveWords.csv')
        neutralWords = readWordFileToList(f'{dir_path}/lib/neutralWords.csv')
        
        # Loop through each article 
        for article in articles:
            # Extract the features for the headline
            features = extractFeatures(article["headline"],positiveWords,negativeWords,neutralWords)
            # Make a predction onheadline sentiment based upon the features 
            article["sentiment"] = classifier.classify(features)
            
        ## Step Four ##
        #   Log the articles to the database 
        # If the enviroment is production then get the production URI 
        # ***NOTE*** Create a local .env file newsArticleScrapingAndSentimentAnalysis directory with ENVIRONMENT and MONGOURI in it, this will set "dev" variables 
        # ENVIRONMENT=dev
        # MONGOURI=mongodb://localhost:27017/StocksApplication
        mongoURI = '' 
        environment = os.environ['ENVIRONMENT']
        if environment == 'prod':
            mongoURI = getSecret('MONGO_URI').get('Parameter').get('Value')
        elif environment == 'dev':
            mongoURI = os.environ['MONGOURI']
        # Get the mongo connection 
        client = getMongoConnection(mongoURI)
        # Write articles to the database 
        writeArticlestoDatabase(client,articles)

        # Return a success message 
        return {
            'Message': 'Articles Succesfully Inserted',
            'Number of Articles Scraped': len(articles)
        }
    except Exception as e:
        print(f'ERROR:Error encountered in handler function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
        }