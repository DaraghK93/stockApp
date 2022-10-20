### Description:
#       This file relates to model_1

### Imports ###
import sys
sys.path.append('../../')
from dataCleaning.lib import cleaningFunctions
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
    #   For the positive and negative headlines tokenize them, get a Freq distibution 
    #   We can do the same with neutral but for now lets just try positive and negative 
    #   Delete also the common words in the freqeuncy distributions 
    ## Postive 
    posTokens   = featureEngineeringFunctions.tokenizeHeadlines(posHeadlines)
    posTokens   = featureEngineeringFunctions.removeStopWords(posTokens)
    posFreqDist = featureEngineeringFunctions.getFreqDist(posTokens)
    ## Negative 
    negTokens   = featureEngineeringFunctions.tokenizeHeadlines(negHeadlines)
    negTokens   = featureEngineeringFunctions.removeStopWords(negTokens)
    negFreqDist = featureEngineeringFunctions.getFreqDist(negTokens)
    ## Find the common words in both negative and positive frequency distributions 
    commonWords = set(posFreqDist) & set(negFreqDist)
    # Now delete the common words in both frequency distributions, common words for negative and positive no use 
    for word in commonWords:
        del posFreqDist[word]
        del negFreqDist[word]
    
    ### Step 3 - Words Lists
    #   Using the positive and negative frequency distributions create a positive and egative words list 
    top100PositiveWords = {word for word, _ in posFreqDist.most_common(100)}
    top100Negative      = {word for word, _ in negFreqDist.most_common(100)}

    ### Step 4 - Feature Extraction ###
    #   Extract the features for the postive, negative and neutral headlines
    #   features is an array in the form [({featureOne:value,featureTwo:value},Goal)] where Goal is positive, negative or neutral 
    features = [] 
    ## positive  
    for posHeadline in posHeadlines[0:3000]:
        features.append((featureEngineeringFunctions.extractFeatures(posHeadline,top100PositiveWords,top100Negative), 'positive'))
    ## negative
    for negHeadline in negHeadlines[0:3000]:
        features.append((featureEngineeringFunctions.extractFeatures(negHeadline,top100PositiveWords,top100Negative), 'negative'))
    ## neutral 
    for neutralHeadline in neuHeadlines[0:3000]:
        features.append((featureEngineeringFunctions.extractFeatures(neutralHeadline,top100PositiveWords,top100Negative), 'neutral'))

    ### Step5. Train the models ###
    # Get the training set and testing set 
    train, test = modelFunctions.getTrainTestSplit(features,0.25)
    # Get the NLTK classifiers
    nltkClassifiers = modelFunctions.trainNLTKModels(train,naiveBayesClassifier=True,decisiontree=True)
    
    # Get the skLearn Classifiers     
    skLearnClassifiers = modelFunctions.trainSKLearnClassifers(
        train=train, 
        bernoulliNB=True,
        multinomialNB=True,
        complementNB=True,
        kNeighborsClassifier=True,
        decisionTreeClassifier=True,
        randomeForestClassifier=True,
        logisticRegression=True,
        mLPClassifer=True,
        adaBoostClassifier=True)

    ### Step 6 - Evaluate the models ###
    for name,classifier in skLearnClassifiers.items():
        accuracy = modelFunctions.getAccuracyofClassifier(classifier,test)
        print(F"{accuracy:.2%} - {name}")

    for name,classifier in nltkClassifiers.items():
        accuracy = modelFunctions.getAccuracyofClassifier(classifier,test)
        print(F"{accuracy:.2%} - {name}")


    ### Step 7 - Save the models ###
    

    