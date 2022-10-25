import pymongo


def getArticles(client,databaseName="test"):
    try:
        db = client[databaseName]
        articles = db.articles.find({}, {"headline":1})
        return articles
    except Exception as e:
        print(f'ERROR: CCould not get articles. Excepton detials.\n{e}')



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