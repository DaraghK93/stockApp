## Description:
#   This file holds functions for training models
import nltk
from nltk.classify.scikitlearn import SklearnClassifier
from random import shuffle
import numpy as np

from sklearn.model_selection import train_test_split

## Sklearn classifies 
from sklearn.naive_bayes import (
    BernoulliNB,
    ComplementNB,
    MultinomialNB,
)
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neural_network import MLPClassifier



def getTrainTestSplit(features,trainPercent):
    """
    This function accepts a features array of tuples and returns the train and test split. 
    The trainPercent is a percentage decimal point. 

    Args:
        features (List): List of tuples in the form [({features},goal)]
        trainPercent (Decimal): A decimal value representing the train percentage, for example 0.25 would result in 25% of the data being used for training.
    """
    try:
        trainLen = (int(len(features)*trainPercent))
        train = features[:trainLen]
        test  = features[trainLen:] 
        return train, test
    except Exception as e:
        print(f'Error in getting train and test split in getTrainTestSplit function.\nException details\n{e}')



def trainSKLearnClassifers(
            features,
            bernoulliNB=False,
            multinomialNB=False,
            complementNB=False,
            kNeighborsClassifier=False,
            decisionTreeClassifier=False,
            randomeForeseClassifier=False,
            logisticRegression=False,
            mLPClassifer=False,
            adaBoostClassifier=False):
    classifiers = {}
    if bernoulliNB: classifiers["BernoulliNB"] = BernoulliNB() 
    if multinomialNB: classifiers["MultinomialNB"] = MultinomialNB() 
    if complementNB: classifiers["ComplementNB"] =  ComplementNB()   
    if kNeighborsClassifier: classifiers["KNeighborsClassifier"] = KNeighborsClassifier()  
    if decisionTreeClassifier: classifiers["DecisionTreeClassifier"] = DecisionTreeClassifier()  
    if randomeForeseClassifier: classifiers["RandomForestClassifier"] = RandomForestClassifier()  
    if logisticRegression: classifiers["LogisticRegression"] = LogisticRegression(max_iter=1000)  
    if mLPClassifer: classifiers["MLPClassifier"] = MLPClassifier(max_iter=1000) 
    if adaBoostClassifier: classifiers["AdaBoostClassifier"] =  AdaBoostClassifier()  
    shuffle(features)
    print(len(features))
    train_count = len(features) // 4
    train = len(features) // (1//0.33)
    print(train_count)
    print(train)


    for name, sklearn_classifier in classifiers.items():
        classifier = nltk.classify.SklearnClassifier(sklearn_classifier)
        classifier.train(features[:train_count])
        accuracy = nltk.classify.accuracy(classifier, features[train_count:])
        print(F"{accuracy:.2%} - {name}")
    
    #if NaiveBayesClassifier:
    #    print("Naive Bayes")
    #if BernoulliNB:
    #    classifiers["BernoulliNB"] = BernoulliNB()
    #if MultinomialNB:
    #    classifiers["MultinomialNB"] = MultinomialNB
    #if 