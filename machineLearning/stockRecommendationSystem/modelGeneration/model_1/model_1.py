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
    stocks = pd.read_csv('machineLearning\stockRecommendationSystem\sp500.csv')

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
    return cos_sim_data, X, stocks

def give_recommendations(index, cos_sim_data, stocks,  print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False):
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


# Randomly selects 4 companies and calculates the top 20 recommendations for each. This is also plotted to visually show cosine sim.
def test_4_rand(X, cos_sim_data):
    plt.figure(figsize=(20,20))
    for q in range(1,5):
        plt.subplot(2,2,q)
        index = np.random.choice(np.arange(0,len(X)))
        to_plot_data = cos_sim_data.drop(index,axis=1)
        plt.plot(to_plot_data.loc[index],'.',color='firebrick')
        recomm_index = give_recommendations(index)
        x = recomm_index['Index']
        y = cos_sim_data.loc[index][x].tolist()
        m = recomm_index['Stocks']
        plt.plot(x,y,'.',color='navy',label='Recommended Stocks')
        plt.title('Stock Selected: '+stocks['shortname'].loc[index])
        plt.xlabel('Stock Index')
        k=0
        for x_i in x:
            plt.annotate('%s'%(m[k]),(x_i,y[k]),fontsize=10)
            k=k+1

        plt.ylabel('Cosine Similarity')
        plt.ylim(0,1)

def output_cosSim_to_csv(X):
    recomm_list = []
    for i in range(len(X)):
        recomm_i = give_recommendations(i)
        recomm_list.append(recomm_i['Stocks'])
    recomm_data = pd.DataFrame(recomm_list, columns=['1', '2', '3', '4', '5', ' 6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'])
    recomm_data['Target'] = stocks['symbol']
    recomm_data = recomm_data[['Target', '1', '2', '3', '4', '5', ' 6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']]
    # Print sample of dataframe
    recomm_data.sample(frac=1).head()
    # Write dataframe to .csv
    recomm_data.to_csv("cosine_sim.csv", encoding='utf-8', index=False)

# Reading in user data from Mongo
from pymongo import MongoClient

mongo_uri = "mongodb://admin:pass@ec2-3-249-145-103.eu-west-1.compute.amazonaws.com:27017/"

def push_rec_to_db():
    # Setting the MongoDB connection
    mongoClient = MongoClient(mongo_uri)
    db = mongoClient.test
    collection = db['user-data']

    user_data = collection.find_one({"email":"recommender_test@gmail.com"})
    user_query = user_data['stocks']
    user_query = user_query[0]
    print(user_query)
    # Query csv based on a stock the user owns
    stocks.iloc[:,2]
    stock_indexes = stocks.iloc[:,2]
    stock_indexes = stock_indexes.values

    i = list(stock_indexes)
    print(i.index(user_query))
    user_recommendations = give_recommendations(i.index(user_query))

    type(user_recommendations)
    user_recommendations["Stocks"]
    print("For user owned stock:", user_query, "the top 20 recommendations are:", user_recommendations["Stocks"])
    new_user_recommendations = user_recommendations["Stocks"]
    final_recs = new_user_recommendations[0:20]
    final_recs = final_recs.tolist()
    print(final_recs)
    collection.update_one({"email":"recommender_test@gmail.com"}, {"$set": {"recommended_stocks": final_recs}})
    return "Success"

current_directory = os.getcwd()
print("CWD: ",current_directory)

cos_sim_data, X, stocks = read_data()

recs = give_recommendations(0, cos_sim_data, stocks,  print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False)

final_recs = recs["Stocks"]
print(final_recs)
