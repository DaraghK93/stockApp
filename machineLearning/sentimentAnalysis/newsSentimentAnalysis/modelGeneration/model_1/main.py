### Description:
#       This file relates to model_1

### Imports ###
import sys
sys.path.append('../../')
from dataCleaning.lib import cleaningFunctions
from featureEngineering import featureEngineeringFunctions


if __name__ == "__main__":
    datasetFile = "../../data/cleanedDatasets/combinedDatasets/combinationOne.csv"
    # Read in the csv file 
    df = cleaningFunctions.readCSVFile(datasetFile)
    posHeadlines      = featureEngineeringFunctions.getHeadlineBySentiment(df,'positive')
    tokenzedHeadlines =  featureEngineeringFunctions.tokenizeHeadlines(posHeadlines)
    print(len(tokenzedHeadlines))
    tokenzedHeadlines = featureEngineeringFunctions.removeStopWords(tokenzedHeadlines)
    print(len(tokenzedHeadlines))
    posFreqDist = featureEngineeringFunctions.getFreqDist(tokenzedHeadlines)
    featureEngineeringFunctions.getWordCount('Hello my name is Bang',["Bang",'boom',"Hello","/"])
    
    #posTokens = featureEngineeringFunctions.processText(posHeadlines)
