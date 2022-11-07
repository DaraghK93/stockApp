import pymongo


def getArticles(client,databaseName="test"):
    """
    Gets the article id's and headlines. 
    Args:
        client (MongoConn): Object returned from the getMongoConnection function. 
        databaseName (str, optional): The name of the database to use. Defaults to "test".
    Returns:
        articles(pymongo cursor): Cursor object which contains results of query.
    """
    try:
        db = client[databaseName]
        articles = db.articles.find({}, {"headline":1})
        return articles
    except Exception as e:
        print(f'ERROR: CCould not get articles. Excepton detials.\n{e}')


def getTweets(client, databaseName="test"):
    """
    Gets the tweet id's and headlines.
    Args:
        client (MongoConn): Object returned from the getMongoConnection function.
        databaseName (str, optional): The name of the database to use. Defaults to "test".
    Returns:
        tweets(pymongo cursor): Cursor object which contains results of query.
    """
    try:
        db = client[databaseName]
        tweets = db.sample_tweet_data.find({}, {"content": 1, "id": 1})
        return tweets
    except Exception as e:
        print(f"ERROR: CCould not get tweets. Excepton detials.\n{e}")


def updateArticle(client, articleId, query, databaseName="test"):
    """
    Updates an article in the database. 
    Args:
        client (MongoConn): Object returned from the getMongoConnection function. 
        articleId (String): The mongoDB ID of the document. 
        query (dict): A dictionary for the query to run on the database in the form {'$set': {key:value}}
        databaseName (str, optional): The name of the database to use. Defaults to "test".
    """
    try:
        db  = client[databaseName]
        db.articles.update_one({'_id':articleId},query) 
    except Exception as e:
        print(f'ERROR: Could not execute update in datbase wihtin function exceuteUpdate.\nException detials:\n{e}')


def updateTweet(client, articleId, query, databaseName="test"):
    """
    Updates an article in the database.
    Args:
        client (MongoConn): Object returned from the getMongoConnection function.
        articleId (String): The mongoDB ID of the document.
        query (dict): A dictionary for the query to run on the database in the form {'$set': {key:value}}
        databaseName (str, optional): The name of the database to use. Defaults to "test".
    """
    try:
        db = client[databaseName]
        db.sample_tweet_data.update_one({"id": articleId}, query)
    except Exception as e:
        print(
            f"ERROR: Could not execute update in datbase wihtin function exceuteUpdate.\nException detials:\n{e}"
        )


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