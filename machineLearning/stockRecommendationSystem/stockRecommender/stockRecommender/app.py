# Module imports
import json
import pandas as pd
import os
# For AWS Param Store
import boto3
# For MongoDB Connection
import pymongo
# from dotenv import load_dotenv


# Setting directory path so the pickle and csv files can be read in
dir_path = os.path.dirname(os.path.realpath(__file__))

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

def index_to_symbol(index):
    """Function used to convert from index number to ticker symbol.
    
    Args:
        index (int): This index is an int corresponding to the index of the company (i.e. the row) based on the dataset.

    Returns:
        str: Returns the corresponding ticker symbol in a string for the company of index "index"  
    """
    try:
        stocks = pd.read_csv(f'{dir_path}/DataSet/stock_data.csv')
        symbol = stocks.iloc[index]
        symbol = symbol[2]
        return symbol
    except Exception as e:
        print(f'ERROR:Error encountered in index_to_symbol function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered in index_to_symbol function.',
        }

def symbol_to_index(symbol):
    """Function used to convert from a ticker symbol input to the index of the symbol.

    Args:
        symbol (str): Ticker symbol for the company you'd like the index of

    Returns:
        int: This index is an int corresponding to the index of the company (i.e. the row) based on the dataset.
    """
    try:
        stocks = pd.read_csv(f'{dir_path}/DataSet/stock_data.csv')
        index = stocks.loc[stocks['symbol'].isin([symbol])].index
        index = index[0]
        return index
    except Exception as e:
        print(f'ERROR:Error encountered in symbol_to_index function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered in symbol_to_index function.',
        }    

def get_user_stock(userID, client):
    try:
        # Load the MongoURI from the dotenv file (Localhost)
        # load_dotenv()
        # mongo_uri = os.getenv('MONGO_URI')
        # Setting the MongoDB connection
        # mongoClient = MongoClient(mongo_uri)
        # Setting the DB name
        db = client[os.environ["DATABASENAME"]]
        # Setting the DB collection names
        user_collection = db['users']
        stocks_collection = db['stocks']
        # Set user data so that portfolios can be checked
        user = user_collection.find_one({"_id": userID})

        # Try - If user exists
        try:
            # This query checks if the user has a portfolio. If not the array is noneType and cannot be indexed, exception is triggered
            user_portfolio = user["portfolios"]
            user_portfolio = user_portfolio[0]

            output = user_collection.aggregate([{'$match': {'username': userID}}, {'$lookup': {'from': 'portfolios', 'localField': 'portfolios', 'foreignField': '_id', 'as': 'portfolios', 'pipeline': [{'$lookup': {'from': 'transactions', 'localField': 'transactions', 'foreignField': '_id', 'as': 'transactions'}}]}}, {
                '$unwind': {
                    'path': '$portfolios'
                }
            }, {
                '$unwind': {
                    'path': '$portfolios.transactions'
                }
            }, {
                '$sort': {
                    'portfolios.transactions.date': -1
                }
            }, {
                '$limit': 1
            }, {
                '$lookup': {
                    'from': 'stocks',
                    'localField': 'portfolios.transactions.stockId',
                    'foreignField': '_id',
                    'as': 'stock'
                }
            }, {
                '$unwind': {
                    'path': '$stock'
                }
            }, {
                '$set': {
                    'stock': '$stock.symbol'
                }
            }, {
                '$project': {
                    'stock': 1
                }
            }
            ])
            output_list = list(output)
            res_str = ""
            # Aggregate query returns a command cursor, this has to be iterated over to access any data.
            for doc in output_list:
                res_str = doc['stock']
            return res_str

        # In case of a user who doesn't have any portfolio yet, return biggest positive mover.
        except:
            top_mover = stocks_collection.aggregate([{"$match": {}}, {"$project": {'symbol': 1,
                                                                                   'daily_change.absoluteChange': 1,
                                                                                   'daily_change.percentageChange': 1,
                                                                                   'daily_change.currentprice': 1}},
                                                     {"$sort": {
                                                         'daily_change.percentageChange': -1}},
                                                     {"$limit": 1}])
            top_mover_list = list(top_mover)
            res_str = ""
            # Aggregate query returns a command cursor, this has to be iterated over to access any data.
            for doc in top_mover_list:
                res_str = doc['symbol']
            return res_str

    # If user doesn't exist, print error
    except Exception as e:
        print(
            f'ERROR:Error encountered in get_user_stock function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered in get_user_stock function.',
        }

def give_recommendations(username, client,  print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False):
    """Recommender function taken in modified form from:https://towardsdatascience.com/hands-on-content-based-recommender-system-using-python-1d643bf314e4. This function takes in the ticker symbol of a stock and returns 20 recommended stocks based on cosine similarity of the "longbusinessssummary" feature from the original dataset.

    Args:
        input (string): The input to this function takes the form of a valid ticker symbol from the dataset, which is any company currently listed on the S&P500. 
        print_recommendation (bool, optional): If you would like to print out the recommendations in a slightly nicer format. Defaults to False.
        print_recommendation_longbusinesssummary (bool, optional): If you would like to print out the long businesssummaries for the recommended companies. Defaults to False.
        print_sectors (bool, optional): If you would like to print out the sectors of the recommended companies. Defaults to False.

    Returns:
        list: This function returns a list of the 20 ticker symbols (strings) of the 20 companies that are closest in similarity to the input. 
    """
    try:
        # Read in stock data from the csv file
        stocks = pd.read_csv(f'{dir_path}/DataSet/stock_data.csv')
        # stocks = pd.read_csv('machineLearning\stockRecommendationSystem\data\stock_data.csv')
        # Read in pickle file of vector data
        cos_sim_data = pd.read_pickle(f'{dir_path}/DataSet/cosine_sim_data.pkl')

        # This is where the main logic of the function is, takes the vectors, sorts them against the target and then returns the top 20 (i.e the 20 with the smallest distance or the highest cosine similarity)
        input = get_user_stock(username, client)
        index = symbol_to_index(input)
        index_recomm = cos_sim_data.loc[index].sort_values(ascending=False).index.tolist()[1:21]
        stocks_recomm = stocks['symbol'].loc[index_recomm].values
        result = {'Stocks': stocks_recomm, 'Index': index_recomm}
        
        # If statements are used to print more information about the recommendations such as the longbusiness summary. Used mainly during development.
        if print_recommendation == True:
            print('The watched stock is this one: %s \n' %(stocks['symbol'].loc[index]))
            k = 1
            for stock in stocks_recomm:
                print('The number %i recommended stock is this one: %s \n' %(k, stock))
        if print_recommendation_longbusinesssummary == True:
            print('The longbusinesssummary of the watched stock is this one:\n %s \n' %(stocks['longbusinesssummary'].loc[index]))
            k = 1
            for q in range(len(stocks_recomm)):
                plot_q = stocks['longbusinesssummary'].loc[index_recomm[q]]
                print('The longbusinesssummary of the number %i recommended stock is this one:\n %s \n' % (
                    k, plot_q))
                k = k+1
        if print_sectors == True:
            print('The sector of the watched stock is this one:\n %s \n' %
                (stocks['sector'].loc[index]))
            k = 1
            for q in range(len(stocks_recomm)):
                plot_q = stocks['sector'].loc[index_recomm[q]]
                print('The sector of the number %i recommended stock is this one:\n %s \n' % (
                    k, plot_q))
                k = k+1
        # Returns only the ticker symbols for the 20 recommendations  
        result = (result["Stocks"]).tolist()
        return result
    except Exception as e:
        print(f'ERROR:Error encountered in giveRecommendations function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered in giveRecommendations function.',
        }    


def lambda_handler(event: dict, context: object):
    """This is the lambda handler function. It runs the recommender function and returns the output of it as a JSON string.

    Args:
        event (JSON): https://docs.aws.amazon.com/lambda/latest/dg/python-handler.html
        context (JSON): https://docs.aws.amazon.com/lambda/latest/dg/python-handler.html

    Returns:
        (JSON): A return with a HTTP status code of 200 and a JSON body of the 20 recommendations 
    """

    # Print statements are helpful for debugging the program once deployed
    print("Event type:", type(event))
    print("Event:", event)

    body = event['body']
    # environment will either be dev or prod 
    environment = os.environ['ENVIRONMENT']
    body = json.loads(body)
    
    if environment == 'prod':
        # All the production specific stuff do here 
        # body = json.loads(body)
        # Will have to get MongoURI for param store here 
        mongoURI = getSecret('MONGO_URI').get('Parameter').get('Value')
    elif environment == 'dev': 
        mongoURI = os.environ['MONGOURI']
    # Get the mongo connection 
    client = getMongoConnection(mongoURI)
    
    # Print statements are helpful for debugging the program once deployed
    # print("Body type:", type(body))
    # print("Body:", body)

    userID = body["userid"]

    # Print statements are helpful for debugging the program once deployed
    # print("Stock type:", type(stock))
    # print("Stock:", stock)

    try:
        recomm = give_recommendations(userID, client)
        return {
        "statusCode": 200,
        "body": json.dumps({
            "message": recomm
        }),
        }
    except Exception as e:
        print(f'ERROR:Error encountered in handler function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
        }