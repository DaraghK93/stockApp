import json
from pymongo import MongoClient
import snscrape.modules.twitter as sntwitter

def handler(event, context):


    def createTweetObject(id, stock, date, username, content):
        try:
            tweetObject = { 'id': id, 'stock': stock.upper(), 'date': date, 'username': username, 'content': content }
        except:
            return json.dumps({"errormessage": "Error creating tweet object"}) 
        return tweetObject

    # Create Connection
    client = MongoClient('mongodb://admin:pass@ec2-3-249-127-86.eu-west-1.compute.amazonaws.com:27017')
    # Select the Database
    database = client['test']
    # Select the collection
    collection = database['sample_tweet_data']


    # Will loop through all 500 stocks we are looking after soon but for now to keep db usage down i'll only do 1/2 stocks
    tweets = []
    stock = 'aapl'
    query = "(#{}) lang:en".format(stock)
    limit = 2
    try:
        for tweet in sntwitter.TwitterSearchScraper(query).get_items():
            if len(tweets) == limit:
                break
            else:
                tweets.append([tweet.date, tweet.user.username, tweet.content])
                # Create the tweet json object
                tweetObject = createTweetObject(tweet.id, stock, str(tweet.date), tweet.user.username, tweet.content)
                # Add tweet to collection
                collection.insert_one(tweetObject)
                
    except:
        return json.dumps({"errormessage": "Error with snscrape"})


    return json.dumps(tweets, default=str)


