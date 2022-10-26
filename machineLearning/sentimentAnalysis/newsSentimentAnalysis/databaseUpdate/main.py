### Imports ###
import sys
sys.path.append('../../bin/')
from database import databaseFunctions
from modelTraining import modelFunctions
from featureEngineering import featureEngineeringFunctions
import os
from dotenv import load_dotenv
load_dotenv()

## Model Directory##
modelDir = "../modelGeneration/model_3"


## Words List ##
# Words lists to use in this script 
positveWordsFile  = f'{modelDir}/data/positiveWords.csv'
negativeWordsFile = f'{modelDir}/data/negativeWords.csv'
neutralWords      = f'{modelDir}/data/neutralWords.csv' 

### The Classifier ###
# The classifier to use
modelName = "MLPClassifier"
modelFile = f'{modelDir}/models/{modelName}.pickle'



if __name__ == "__main__":
    # Get mngo uri form .env
    mongoURI =  os.getenv('MONGO_URI')
    # Get a database connect 
    con = databaseFunctions.getMongoConnection(mongoURI)
    # Get the articles headlines 
    articles = databaseFunctions.getArticles(con)
    # Read in the words files 
    positiveWords = featureEngineeringFunctions.readWordFileToList(positveWordsFile)
    negativeWords = featureEngineeringFunctions.readWordFileToList(negativeWordsFile)
    neutralWords = featureEngineeringFunctions.readWordFileToList(neutralWords)
    # Load the classifier 
    classifier = modelFunctions.loadClassifier(modelFile)
    articleCount = 0 
    for article in articles:
        features = featureEngineeringFunctions.extractFeatures(article['headline'],positiveWords,negativeWords,neutralWords)
        prediction = classifier.classify(features)
        query = {'$set': {'sentiment':prediction}}
        databaseFunctions.updateArticle(con,article['_id'],query)
        articleCount+=1
    print(f'{articleCount} articles updated in the database {mongoURI}')