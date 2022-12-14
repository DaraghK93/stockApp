# Module imports
import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer


# This function is used to read in the original dataset and save the computed vectors as a pickle file.
def read_data():
    # Read in the s&p dataset
    stocks = pd.read_csv('machineLearning\stockRecommendationSystem\data\sp500.csv')
    # Create array X of the all long business summaries
    X = np.array(stocks.longbusinesssummary)

    # Encode the textual data from X into vectors so that we can compute the cosine distance
    text_data = X
    model = SentenceTransformer('distilbert-base-nli-mean-tokens')
    embeddings = model.encode(text_data, show_progress_bar=True)
    embed_data = embeddings
    X = np.array(embed_data)
    cos_sim_data = pd.DataFrame(cosine_similarity(X))

    # Write cosine similarity dataframe to pickle file. Pickle was needed as saving as csv caused indexing errors
    cos_sim_data.to_pickle('machineLearning\stockRecommendationSystem\data\cosine_sim_data.pkl')
    # Write stock data to csv file
    stocks.to_csv("machineLearning\stockRecommendationSystem\data\stock_data.csv", encoding='utf-8', index=False)
    
    # Returns vector data, text data and stock data
    return cos_sim_data, X, stocks
    
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
        stocks = pd.read_csv('machineLearning\stockRecommendationSystem\data\stock_data.csv')
        # Read in pickle file of vector data
        cos_sim_data = pd.read_pickle('machineLearning\stockRecommendationSystem\data\cosine_sim_data.pkl')

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
        return result["Stocks"]
    except Exception as e:
        print(f'ERROR:Error encountered in giveRecommendations function.\nException Details:\n\t{e}')
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
        stocks = pd.read_csv('machineLearning\stockRecommendationSystem\data\stock_data.csv')
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
        stocks = pd.read_csv('machineLearning\stockRecommendationSystem\data\stock_data.csv')
        index = stocks.loc[stocks['symbol'].isin([symbol])].index
        index = index[0]
        return index
    except Exception as e:
        print(f'ERROR:Error encountered in symbol_to_index function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered in symbol_to_index function.',
        }    

# print(index_to_symbol("AAPL"))
# print(symbol_to_index("AAPL"))
print(give_recommendations("AAPL", print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False))