# This script was originally developed as a Jupyter notebook.
# It was used to perform some ED 
# This was converted to a Python script so that other team members could more easily review it on GitHub.
# Running this script will produce a lot of plots, viewing the Jupyter Notebook version of the file is an easier way of examining the data (no need for the ridiculous number of print statements). It will then give some plots to show how the cosine similarity is compared and at the end will return 20 recommendations for Apple Inc.
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import PCA
from sentence_transformers import SentenceTransformer

# Read in the s&p dataset
stocks = pd.read_csv('machineLearning\stockRecommendationSystem\data\sp500.csv')

# Print info about dataset
print("Dataframe Info:")
print(stocks.info())
print("-"*40)

print("Dataframe Head:")
print(stocks.head())
print("-"*40)

print("Daraframe Shape:")
print(stocks.shape)
print("-"*40)

print("Daraframe Columns:")
print(stocks.columns)
print("-"*40)

print("Daraframe Description:")
print(stocks.describe(include='O'))
print("-"*40)

# Remove some columns that won't be used
stocks.drop(['idnumber','longnamesort','prices', 'weight', 'esgrating','logo'], inplace=True, axis=1)
# Re-print info about dataset after columns are removed
print("Dataframe Info:")
print(stocks.info())
print("-"*40)

# Feature Distribution Plots
## Exchange Distribution
print(stocks['exchange'].value_counts().plot(x = 'exchange', y ='count', kind = 'bar', figsize = (20,5)))
plt.show()
## Sector Distribution
print(stocks['sector'].value_counts().plot(x = 'sector', y ='count', kind = 'bar', figsize = (10,5)))
plt.show()
## Industry Distribution
print(stocks['industry'].value_counts().plot(x = 'industry', y ='count', kind = 'bar', figsize = (20,5)))
plt.show()
## Market Cap Distribution 
print(stocks['marketcap'].value_counts().plot(x = 'marketcap', y ='count', kind = 'bar', figsize = (10,5)))
plt.show()
## Ebidta Distribution
print(stocks['ebitda'].value_counts().plot(x = 'ebitda', y ='count', kind = 'bar', figsize = (30,5)))
plt.show()
## Revenue Growth Distribution
print(stocks['revenuegrowth'].value_counts().plot(x = 'revenuegrowth', y ='count', kind = 'bar', figsize = (20,10)))
plt.show()
## City Distribution
print(stocks['city'].value_counts().plot(x = 'city', y ='count', kind = 'bar', figsize = (30,10)))
plt.show()
## State Distribution
print(stocks['state'].value_counts().plot(x = 'state', y ='count', kind = 'bar', figsize = (20,10)))
plt.show()
## Country Distribution
print(stocks['country'].value_counts().plot(x = 'country', y ='count', kind = 'bar', figsize = (20,10)))
plt.show()
## Full Time Employees Distribution
print(stocks['fulltimeemployees'].value_counts().plot(x = 'state', y ='count', kind = 'bar', figsize = (10,5)))
plt.show()
## Long Business Summary Word Count Distribution
print(stocks["longbusinesssummary"].apply(lambda n: len(n.split())).plot(x = 'state', y ='count', kind = 'bar', figsize = (25,5)))
plt.show()
## Long Business Summary Word Count Description (Min, Max, Mean)
stocks["longbusinesssummary"].apply(lambda n: len(n.split())).describe()

# Create array X of the all long business summaries
X = np.array(stocks.longbusinesssummary)
# Encode the textual data from X into vectors so that we can compute the cosine distance
text_data = X
model = SentenceTransformer('distilbert-base-nli-mean-tokens')
embeddings = model.encode(text_data, show_progress_bar=True)
embed_data = embeddings
X = np.array(embed_data)

# Principal Component Analysis (PCA) of the data features. This is used to gain a better understanding of the data.
n_comp = 5
pca = PCA(n_components=n_comp)
pca.fit(X)
pca_data = pd.DataFrame(pca.transform(X))
pca_data.head()
sns.pairplot(pca_data)
cos_sim_data = pd.DataFrame(cosine_similarity(X))

# Recommender function taken in modified form from:https://towardsdatascience.com/hands-on-content-based-recommender-system-using-python-1d643bf314e4
def give_recommendations(index, print_recommendation=False, print_recommendation_longbusinesssummary=False, print_sectors=False):
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
plt.show()

# Test recommendation on one specific company (AAPL)
give_recommendations(40,True, True, True)