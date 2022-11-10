import json
# Module imports
import pandas as pd
# import numpy as np
import os

# from sklearn.metrics.pairwise import cosine_similarity
# from sentence_transformers import SentenceTransformer

dir_path = os.path.dirname(os.path.realpath(__file__))
    
# Recommender function taken in modified form from:https://towardsdatascience.com/hands-on-content-based-recommender-system-using-python-1d643bf314e4
# This function takes in the index of a stock and returns 20 recommended stocks based on cosine similarity.
def give_recommendations(input,  print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False):
    
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


# Function used to convert from index number to ticker symbol.
# Takes in 1 argument index and returns the corresponding ticker symbol  
def index_to_symbol(index):
    stocks = pd.read_csv(f'{dir_path}/DataSet/stock_data.csv')
    symbol = stocks.iloc[index]
    symbol = symbol[2]
    return symbol


# Function used to convert from a ticker symbol input to the index of the symbol.
# Takes in 1 argument symbol, and returns a single number index corresponding to that symbol.
def symbol_to_index(symbol):
    stocks = pd.read_csv(f'{dir_path}/DataSet/stock_data.csv')
    index = stocks.loc[stocks['symbol'].isin([symbol])].index
    index = int(index[0])
    return index
    

def lambda_handler(event, context):
    try:
        recomm = give_recommendations("AAPL")
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

