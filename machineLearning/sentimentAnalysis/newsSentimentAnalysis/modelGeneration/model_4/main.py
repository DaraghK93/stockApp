## Description:
#       This file relates to model_3 training and feature engineering
#       Running this script will generate a report and pickle files to the "models" directory
#       ***DO NOT MAKE MASSIVE CHANGES TO THIS FILE OR PREFERABLY NONE AT ALL, GOOD FOR REPORT TO KEEP VERSIONS OF ITERATIONS***
## Differecnes 
#       This version of the model uses the https://sraf.nd.edu/loughranmcdonald-master-dictionary/ word dictionary for the negative, possitive word count 
#       Credit to Caolan for cleaning this dataset 

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

    ### Step 1. Get the positive, negative and neutral headlines 
    posHeadlines      = featureEngineeringFunctions.getHeadlineBySentiment(df,'positive')
    negHeadlines      = featureEngineeringFunctions.getHeadlineBySentiment(df,'negative')
    neuHeadlines      = featureEngineeringFunctions.getHeadlineBySentiment(df,'neutral')

    ### Step 2. Read in the positive, negative and neutral words list 
    posWordsList      = featureEngineeringFunctions.readWordFileToList('./data/pos_words.csv')
    negWordsList      = featureEngineeringFunctions.readWordFileToList('./data/neg_words.csv')
    neutralWordsList  = featureEngineeringFunctions.readWordFileToList('./data/neutral_words.csv')

    ### Step 3. Feature Extraction 
    #   Extract the features for the postive, negative and neutral headlines
    #   features is an array in the form [({featureOne:value,featureTwo:value},Goal)] where Goal is positive, negative or neutral 
    features = [] 
    ## positive  
    for posHeadline in posHeadlines:
        features.append((featureEngineeringFunctions.extractFeatures(posHeadline,posWordsList,negWordsList,neuWords=neutralWordsList), 'positive'))
    ## negative
    for negHeadline in negHeadlines:
        features.append((featureEngineeringFunctions.extractFeatures(negHeadline,posWordsList,negWordsList,neuWords=neutralWordsList), 'negative'))
    ## neutral 
    for neutralHeadline in neuHeadlines:
        features.append((featureEngineeringFunctions.extractFeatures(neutralHeadline,posWordsList,negWordsList,neuWords=neutralWordsList), 'neutral'))

    ### Step 4. Train the models ###
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

    ### Step 5 - Evaluate the models and save them ###
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
    # show the results 
    modelFunctions.evaluateTopModels(evalFile) 