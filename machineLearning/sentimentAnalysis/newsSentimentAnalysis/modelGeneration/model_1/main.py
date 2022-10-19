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
    print(tokenzedHeadlines)
    #posTokens = featureEngineeringFunctions.processText(posHeadlines)
