import sys

sys.path.append("../../../bin")
from dataCleaning import cleaningFunctions
from featureEngineering import featureEngineeringFunctions
from modelTraining import modelFunctions


def main():

    ### Dataset file paths
    dataset_loc = "../../cleanedDatasets/combined.csv"
    posWords_loc = "../../cleanedDatasets/pos_words.csv"
    negWords_loc = "../../cleanedDatasets/neg_words.csv"
    neuWords_loc = "../../cleanedDatasets/neutral_words.csv"

    ### read in datasets
    df = cleaningFunctions.readCSVFile(dataset_loc)
    posWordsList = cleaningFunctions.readCSVFile(posWords_loc)
    negWordsList = cleaningFunctions.readCSVFile(negWords_loc)
    neuWordsList = cleaningFunctions.readCSVFile(neuWords_loc)

    ### Step 1. Get the postive, negative and neutral headlines
    posTweets = featureEngineeringFunctions.getTweetBySentiment(df, "Positive")
    negTweets = featureEngineeringFunctions.getTweetBySentiment(df, "Negative")
    neuTweets = featureEngineeringFunctions.getTweetBySentiment(df, "Neutral")

    ### Remove stopwords test
    df = featureEngineeringFunctions.removeStopWordsFromTweet(df)

    ### Extract features
    features = []

    ## remove empty strings after cleaning
    posTweets = [i.strip() for i in posTweets]
    posTweets = [i for i in posTweets if i]
    negTweets = [i.strip() for i in negTweets]
    negTweets = [i for i in negTweets if i]
    neuTweets = [i.strip() for i in neuTweets]
    neuTweets = [i for i in neuTweets if i]

    ### Extract features
    for posTweet in posTweets:
        features.append(
            (
                featureEngineeringFunctions.extractFeatures(
                    posTweet, posWordsList, negWordsList
                ),
                "positive",
            )
        )
    for negTweet in negTweets:
        features.append(
            (
                featureEngineeringFunctions.extractFeatures(
                    negTweet, posWordsList, negWordsList
                ),
                "negative",
            )
        )

    ### Train models
    classifiers = {}
    train, test = modelFunctions.getTrainTestSplit(features, 0.7)

    classifiers.update(
        modelFunctions.trainNLTKModels(
            train, naiveBayesClassifier=True, decisiontree=True
        )
    )

    classifiers.update(
        modelFunctions.trainSKLearnClassifers(
            train=train,
            bernoulliNB=True,
            multinomialNB=True,
            complementNB=True,
            kNeighborsClassifier=True,
            decisionTreeClassifier=True,
            randomeForestClassifier=True,
            logisticRegression=True,
            mLPClassifer=True,
            adaBoostClassifier=True,
        )
    )

    ### Evaluation
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


if __name__ == "__main__":
    main()
