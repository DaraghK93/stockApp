# Module imports
import pandas as pd
import numpy as np
import json
import os
import random
import boto3
import pymongo

from sklearn.metrics.pairwise import cosine_similarity
from sklearn import preprocessing
from sentence_transformers import SentenceTransformer
from pymongo import MongoClient
from dotenv import load_dotenv

# This function is used to read in the original dataset and save the computed vectors as a pickle file.


def read_data():
    # Read in the s&p dataset
    stocks = pd.read_csv(
        'machineLearning\stockRecommendationSystem\modelGeneration\model_3\stocks.csv')

    # Remove some columns that won't be used
    stocks.drop(['idnumber', 'longnamesort', 'weight'], inplace=True, axis=1)
    # print(stocks)
    print(stocks.info())
    # Create array X of the all long business summaries, sectors, industries
    X = np.array(stocks.longbusinesssummary + " " + stocks.sector + " " + stocks.industry)

    # Encode the textual data from X into vectors so that we can compute the cosine distance
    text_data = X
    model = SentenceTransformer('distilbert-base-nli-mean-tokens')
    embeddings = model.encode(text_data, show_progress_bar=True)
    embed_data = embeddings
    X = np.array(embed_data)

    cos_sim_data = pd.DataFrame(cosine_similarity(X))
    # Write cosine similarity dataframe to pickle file. Pickle was needed as saving as csv caused indexing errors
    cos_sim_data.to_pickle('machineLearning\stockRecommendationSystem\modelGeneration\model_3\cosine_sim_data.pkl')

    # Write stock data to csv file

    stocks.to_csv("machineLearning\stockRecommendationSystem\modelGeneration\model_3\stock_data.csv", encoding='utf-8', index=False)
    # Returns vector data, text data and stock data
    return cos_sim_data, X, stocks

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

def get_user_stock(userID):
    try:
        # Load the MongoURI from the dotenv file (Localhost)
        load_dotenv()
        mongo_uri = os.getenv('MONGO_URI')
        # Setting the MongoDB connection
        mongoClient = MongoClient(mongo_uri)
        # Setting the DB name
        db = mongoClient.dev
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


def give_recommendations(username,  print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False):
    """Recommender function taken in modified form from:https://towardsdatascience.com/hands-on-content-based-recommender-system-using-python-1d643bf314e4. This function takes in the username of a user and from there finds the symbol of the first stock from their first portfolio. It then returns 20 recommended stocks based on cosine similarity of the "longbusinessssummary" feature from the original dataset.

    Args:
        username (string): The input to this function takes the form of a valid username from the database. 
        print_recommendation (bool, optional): If you would like to print out the recommendations in a slightly nicer format. Defaults to False.
        print_recommendation_longbusinesssummary (bool, optional): If you would like to print out the long businesssummaries for the recommended companies. Defaults to False.
        print_sectors (bool, optional): If you would like to print out the sectors of the recommended companies. Defaults to False.

    Returns:
        list: This function returns a list of the 20 ticker symbols (strings) of the 20 companies that are closest in similarity to the first stock owned by the user. 
    """
    try:
        # Read in stock data from the csv file
        stocks = pd.read_csv(
            'machineLearning\stockRecommendationSystem\data\stock_data.csv')
        # Read in pickle file of vector data
        cos_sim_data = pd.read_pickle(
            'machineLearning\stockRecommendationSystem\data\cosine_sim_data.pkl')

        # This is where the main logic of the function is, takes the vectors, sorts them against the target and then returns the top 20 (i.e the 20 with the smallest distance or the highest cosine similarity)
        input = get_user_stock(username)
        index = symbol_to_index(input)
        index_recomm = cos_sim_data.loc[index].sort_values(
            ascending=False).index.tolist()[1:21]
        stocks_recomm = stocks['symbol'].loc[index_recomm].values
        result = {'Stocks': stocks_recomm, 'Index': index_recomm}

        # If statements are used to print more information about the recommendations such as the longbusiness summary. Used mainly during development.
        if print_recommendation == True:
            print('The watched stock is this one: %s \n' %
                  (stocks['symbol'].loc[index]))
            k = 1
            for stock in stocks_recomm:
                print('The number %i recommended stock is this one: %s \n' %
                      (k, stock))
        if print_recommendation_longbusinesssummary == True:
            print('The longbusinesssummary of the watched stock is this one:\n %s \n' % (
                stocks['longbusinesssummary'].loc[index]))
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
        return result["Stocks"]
    except Exception as e:
        print(
            f'ERROR:Error encountered in giveRecommendations function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered in giveRecommendations function.',
        }


def index_to_symbol(index):
    """Function used to convert from index number to ticker symbol.

    Args:
        index (int): This index is an int corresponding to the index of the company (i.e. the row) based on the dataset.

    Returns:
        str: Returns the corresponding ticker symbol in a string for the company of index "index"  
    """
    try:
        stocks = pd.read_csv(
            'machineLearning\stockRecommendationSystem\data\stock_data.csv')
        symbol = stocks.iloc[index]
        symbol = symbol[2]
        return symbol
    except Exception as e:
        print(
            f'ERROR:Error encountered in index_to_symbol function.\nException Details:\n\t{e}')
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
        stocks = pd.read_csv(
            'machineLearning\stockRecommendationSystem\data\stock_data.csv')
        index = stocks.loc[stocks['symbol'].isin([symbol])].index
        index = index[0]
        return index
    except Exception as e:
        print(
            f'ERROR:Error encountered in symbol_to_index function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered in symbol_to_index function.',
        }


# User with no portfolios
# print(give_recommendations("dknee12345sd", print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False))

# User with portfolio
# print(give_recommendations("dknee12345", print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False))
# print(give_recommendations("ObjectId('638529d8aa38c5b63ccaa8c7')", print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False))

# User with no portfolios
# print(get_user_stock("dknee12345sd"))

# User with portfolio
# print(get_user_stock("dknee12345"))

print(read_data())