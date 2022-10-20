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
        # Shuffle the list so all pos, neg and neu not bedside eachother 
        shuffle(features)
        trainLen = (int(len(features)*trainPercent))
        train = features[:trainLen]
        test  = features[trainLen:] 
        return train, test
    except Exception as e:
        print(f'Error in getting train and test split in getTrainTestSplit function.\nException details\n{e}')



def trainSKLearnClassifers(
            train,
            bernoulliNB=False,
            multinomialNB=False,
            complementNB=False,
            kNeighborsClassifier=False,
            decisionTreeClassifier=False,
            randomeForestClassifier=False,
            logisticRegression=False,
            mLPClassifer=False,
            adaBoostClassifier=False):
    """
    This Function trains te classifiers in the sklearn package. 
    Inputted is the training dataset along with the names of any classifiers which you want to be trained on this data. 
    The return is a dictionary of trained classifiers. 

    Args:
        train (List): List of tuples in the form [({features},goal)]
        bernoulliNB (bool, optional): Train bernoulliNB classifier. Defaults to False.
        multinomialNB (bool, optional): Train multinomialNB classifier. Defaults to False.
        complementNB (bool, optional): Train multinomialNB classifier. Defaults to False.
        kNeighborsClassifier (bool, optional): Train kNeighborsClassifier classifier. Defaults to False.
        decisionTreeClassifier (bool, optional): Train decisionTreeClassifier classifier. Defaults to False.
        randomeForestClassifier (bool, optional): Train randomeForestClassifier. Defaults to False.
        logisticRegression (bool, optional): Train logisticRegression classifier. Defaults to False.
        mLPClassifer (bool, optional): Train logisticRegression classifier. Defaults to False.
        adaBoostClassifier (bool, optional): Train adaBoostClassifier. Defaults to False.

    Returns:
        trainedClassifiers(dict): A dictionary of trained classifiers. 
    """

    try:
        classifiers = {}
        if bernoulliNB: classifiers["BernoulliNB"] = BernoulliNB() 
        if multinomialNB: classifiers["MultinomialNB"] = MultinomialNB() 
        if complementNB: classifiers["ComplementNB"] =  ComplementNB()   
        if kNeighborsClassifier: classifiers["KNeighborsClassifier"] = KNeighborsClassifier()  
        if decisionTreeClassifier: classifiers["DecisionTreeClassifier"] = DecisionTreeClassifier()  
        if randomeForestClassifier: classifiers["RandomForestClassifier"] = RandomForestClassifier()  
        if logisticRegression: classifiers["LogisticRegression"] = LogisticRegression(max_iter=1000)  
        if mLPClassifer: classifiers["MLPClassifier"] = MLPClassifier(max_iter=1000) 
        if adaBoostClassifier: classifiers["AdaBoostClassifier"] =  AdaBoostClassifier()  
        trainedClassifiers = {}
        for name, sklearn_classifier in classifiers.items():
            classifier = nltk.classify.SklearnClassifier(sklearn_classifier)
            classifier.train(train)
            trainedClassifiers[name] = classifier
            #accuracy  = nltk.classify.accuracy(classifier, test)
            #print(F"{accuracy:.2%} - {name}")
        return trainedClassifiers
    except Exception as e:
        print(f'Error in training sklearn classifiers in trainSKLearnClassifers function.\nException details\n{e}')
    
    