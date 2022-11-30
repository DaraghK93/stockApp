# Module imports
import json
import pandas as pd
import os

# For AWS Param Store
import boto3
# For MongoDB Connection
import pymongo

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



def give_recommendations(input,  print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False):
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
    if environment == 'prod':
        # All the production specific stuff do here 
        body = json.loads(body)
        # Will have to get MongoURI for param store here 
    # elif environment == 'dev': 
    #   read in your local vars for db etc.  


    # Print statements are helpful for debugging the program once deployed
    print("Body type:", type(body))
    print("Body:", body)

    stock = body["stock"]

    # Print statements are helpful for debugging the program once deployed
    print("Stock type:", type(stock))
    print("Stock:", stock)

    try:
        recomm = give_recommendations(stock)
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