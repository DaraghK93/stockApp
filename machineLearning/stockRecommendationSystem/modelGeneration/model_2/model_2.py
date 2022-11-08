import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import PCA

# Capture similarity
from sentence_transformers import SentenceTransformer

def read_data():
    # Read in the s&p dataset
    stocks = pd.read_csv('machineLearning\stockRecommendationSystem\modelGeneration\model_1\sp500.csv')

    # Create array X of the all long business summaries
    X = np.array(stocks.longbusinesssummary)

    # Encode the textual data from X into vectors so that we can compute the cosine distance
    text_data = X
    model = SentenceTransformer('distilbert-base-nli-mean-tokens')
    embeddings = model.encode(text_data, show_progress_bar=True)
    embed_data = embeddings
    X = np.array(embed_data)
    n_comp = 5
    pca = PCA(n_components=n_comp)
    pca.fit(X)
    pca_data = pd.DataFrame(pca.transform(X))
    pca_data.head()

    # Recommender function taken in modified form from:https://towardsdatascience.com/hands-on-content-based-recommender-system-using-python-1d643bf314e4
    cos_sim_data = pd.DataFrame(cosine_similarity(X))
    # Write cosine similarity dataframe to .csv
    cos_sim_data.to_csv("machineLearning\stockRecommendationSystem\modelGeneration\model_2\cosine_sim_data.csv", encoding='utf-8', index=False)
    cos_sim_data.to_pickle('machineLearning\stockRecommendationSystem\modelGeneration\model_2\cosine_sim_data.pkl')
    stocks.to_csv("stock_data.csv", encoding='utf-8', index=False)
    return cos_sim_data, X, stocks

def give_recommendations(index,  print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False):
    # Read in stock data from the csv file
    stocks = pd.read_csv('stock_data.csv')
    # Read in 
    cos_sim_data = pd.read_pickle('machineLearning\stockRecommendationSystem\modelGeneration\model_2\cosine_sim_data.pkl')

    index_recomm = cos_sim_data.loc[index].sort_values(ascending=False).index.tolist()[1:21]
    stocks_recomm = stocks['symbol'].loc[index_recomm].values
    result = {'Stocks': stocks_recomm, 'Index': index_recomm}
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
    return result


recs = give_recommendations(0, print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False)
final_recs = recs["Stocks"]
print(final_recs)