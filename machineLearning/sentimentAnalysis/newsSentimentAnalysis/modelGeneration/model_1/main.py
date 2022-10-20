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
        # Evaluation 
        accuracy= modelFunctions.getAccuracyofClassifier(classifier,test)
        evaluations.append({'classifier':name,'accuracy':f'{accuracy:.2%}'})
        print(F"{accuracy:.2%} - {name}")
        # Save to pickle file
        modelFile = f'./models/{name}.pickle'
        modelFunctions.saveClassifier(classifier,modelFile)
    # Write the results to a csv 
    evalFile = "evaluationResults.csv"
    modelFunctions.generateEvaluationReport(evaluations,evalFile)

    ### Step 7 - Save the models ###


    

    