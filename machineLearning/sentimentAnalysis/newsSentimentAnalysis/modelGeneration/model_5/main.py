## Description:
#       This file relates to model_5 training and feature engineering
#       Running this script will generate a report and pickle files to the "models" directory
#       ***DO NOT MAKE MASSIVE CHANGES TO THIS FILE OR PREFERABLY NONE AT ALL, GOOD FOR REPORT TO KEEP VERSIONS OF ITERATIONS***

### Imports ###
import sys
sys.path.append('../../../bin')
from dataCleaning import cleaningFunctions
from featureEngineering import featureEngineeringFunctions
from modelTraining import modelFunctions



if __name__ == "__main__":
    datasetFile = "../../data/cleanedDatasets/combinedDatasets/combinationOne.csv"
    # Read in the csv file 
    df = cleaningFunctions.readCSVFile(datasetFile)

    ### Step 1. Get the postive, negative and neutral headlines 
    posHeadlines      = featureEngineeringFunctions.getHeadlineBySentiment(df,'positive')
    negHeadlines      = featureEngineeringFunctions.getHeadlineBySentiment(df,'negative')
    neuHeadlines      = featureEngineeringFunctions.getHeadlineBySentiment(df,'neutral')

    ### Step 2. 
    #   For the positive, negative and neutral headlines tokenize them, get a Freq distibution 
    #   Delete also the common words in the freqeuncy distributions 
    ## Postive 
    posTokens   = featureEngineeringFunctions.tokenizeHeadlines(posHeadlines)
    posTokens   = featureEngineeringFunctions.removeStopWords(posTokens)
    posFreqDist = featureEngineeringFunctions.getFreqDist(posTokens)
    ## Negative 
    negTokens   = featureEngineeringFunctions.tokenizeHeadlines(negHeadlines)
    negTokens   = featureEngineeringFunctions.removeStopWords(negTokens)
    negFreqDist = featureEngineeringFunctions.getFreqDist(negTokens)
    ## Neutral 
    neuTokens   = featureEngineeringFunctions.tokenizeHeadlines(neuHeadlines)
    neuTokens   = featureEngineeringFunctions.removeStopWords(neuTokens)
    neuFreqDist = featureEngineeringFunctions.getFreqDist(neuTokens)
    ## Find the common words in both negative and positive frequency distributions 
    commonWords = set(posFreqDist) & set(negFreqDist) & set(neuFreqDist)
    # Now delete the common words in both frequency distributions, common words for negative and positive no use 
    for word in commonWords:
        del posFreqDist[word]
        del negFreqDist[word]
        del neuFreqDist[word]
    
    ### Step 3 - Words Lists
    #   Using the positive and negative frequency distributions create a positive and egative words list 
    numberOfWords = 1000
    top100PositiveWords = {word for word, _ in posFreqDist.most_common(numberOfWords)}
    top100Negative      = {word for word, _ in negFreqDist.most_common(numberOfWords)}
    top100Neutral       = {word for word, _ in neuFreqDist.most_common(numberOfWords)}
    # Write to a file 
    featureEngineeringFunctions.writeWordsListToCSV(posFreqDist,'data/positiveWords.csv',numWords=numberOfWords)
    featureEngineeringFunctions.writeWordsListToCSV(negFreqDist,'data/negativeWords.csv',numWords=numberOfWords)
    featureEngineeringFunctions.writeWordsListToCSV(neuFreqDist,'data/neutralWords.csv',numWords=numberOfWords)

    ### Step 4 - Feature Extraction ###
    #   Extract the features for the postive, negative and neutral headlines
    #   features is an array in the form [({featureOne:value,featureTwo:value},Goal)] where Goal is positive, negative or neutral 
    features = [] 
    ## positive  
    for posHeadline in posHeadlines:
        features.append((featureEngineeringFunctions.extractFeatures(posHeadline,top100PositiveWords,top100Negative,neuWords=top100Neutral), 'positive'))
    ## negative
    for negHeadline in negHeadlines:
        features.append((featureEngineeringFunctions.extractFeatures(negHeadline,top100PositiveWords,top100Negative,neuWords=top100Neutral), 'negative'))
    ## neutral 
    for neutralHeadline in neuHeadlines:
        features.append((featureEngineeringFunctions.extractFeatures(neutralHeadline,top100PositiveWords,top100Negative,neuWords=top100Neutral), 'neutral'))

    

    ### Step 5. Get the train/test split and over sample the train data ###
    train, test = modelFunctions.getTrainTestSplit(features,0.25)
    modelFunctions.upsampleTrainData(train)