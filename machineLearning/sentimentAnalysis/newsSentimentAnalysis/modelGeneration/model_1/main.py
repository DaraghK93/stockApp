### Description:
#       This file relates to model_1 training and feature engineering
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
    # Write the words to a file alse 
    featureEngineeringFunctions.writeWordsListToCSV(posFreqDist,'data/positiveWords.csv')
    featureEngineeringFunctions.writeWordsListToCSV(negFreqDist,'data/negativeWords.csv')



    ### Step 4 - Feature Extraction ###
    #   Extract the features for the postive, negative and neutral headlines
    #   features is an array in the form [({featureOne:value,featureTwo:value},Goal)] where Goal is positive, negative or neutral 
    features = [] 
    ## positive  
    for posHeadline in posHeadlines:
        features.append((featureEngineeringFunctions.extractFeatures(posHeadline,top100PositiveWords,top100Negative), 'positive'))
    ## negative
    for negHeadline in negHeadlines:
        features.append((featureEngineeringFunctions.extractFeatures(negHeadline,top100PositiveWords,top100Negative), 'negative'))
    ## neutral 
    for neutralHeadline in neuHeadlines:
        features.append((featureEngineeringFunctions.extractFeatures(neutralHeadline,top100PositiveWords,top100Negative), 'neutral'))

    ### Step5. Train the models ###
    classifiers = {}
    # Get the training set and testing set, use 25% of data to train 
    train, test = modelFunctions.getTrainTestSplit(features,0.25)
    # Get the NLTK classifiers
    classifiers.update(modelFunctions.trainNLTKModels(train,naiveBayesClassifier=True,decisiontree=True))
    # Get the skLearn Classifiers     
    classifiers.update(modelFunctions.trainSKLearnClassifers(
        train=train, 
        bernoulliNB=True,
        multinomialNB=True,
        complementNB=True,
        kNeighborsClassifier=True,
        decisionTreeClassifier=True,
        randomeForestClassifier=True,
        logisticRegression=True,
        mLPClassifer=True,
        adaBoostClassifier=True))

    ### Step 6 - Evaluate the models and save them ###
    evaluations = [] 
    for name,classifier in classifiers.items():
        # Evaluate the model and add it to the evulations list 
        evaluation = {}
        evaluation["model"] = name
        evaluation.update(modelFunctions.evaluateModel(classifier,test))
        evaluations.append(evaluation)
        # Save to pickle file
        modelFile = f'./models/{name}.pickle'
        modelFunctions.saveClassifier(classifier,modelFile)
    # Write the results to a csv 
    evalFile = "evaluationResults.csv"
    modelFunctions.generateEvaluationReport(evaluations,evalFile)   