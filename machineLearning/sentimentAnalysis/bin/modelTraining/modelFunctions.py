## Description:
#   This file holds functions for training models
import nltk
from nltk.classify.scikitlearn import SklearnClassifier
from random import shuffle
import pickle 
import pandas as pd
import collections
import csv

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

from nltk.metrics.scores import precision, recall, f_measure, accuracy


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

def trainNLTKModels(train,naiveBayesClassifier=False,decisiontree=False):
    """
    Trains the NLTK classifiers 

    Args:
        train (List): List of tuples in the form [({features},goal)]
        naiveBayesClassifier (bool, optional): If True will train naiveBayes classifier. Defaults to False.
        decisiontree (bool, optional): If True will train decisiontree classifier. Defaults to False.

    Returns:
        classifiers(dict): Dictionary containing trained classifiers. 
    """
    try:
        classifiers = {}
        if naiveBayesClassifier: classifiers["NaiveBayesClassifier"] = nltk.NaiveBayesClassifier.train(train)
        if decisiontree: classifiers["DecisionTreeClassifier"] = nltk.DecisionTreeClassifier.train(train)
        return classifiers
    except Exception as e:
        print(f'Error in getting the NLTK classifiers in function trainNLTKModels.\nException details\n{e}')


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
        if randomeForestClassifier: classifiers["RandomForestClassifier"] = RandomForestClassifier()  
        if logisticRegression: classifiers["LogisticRegression"] = LogisticRegression(max_iter=1000)  
        if mLPClassifer: classifiers["MLPClassifier"] = MLPClassifier(max_iter=1000) 
        if adaBoostClassifier: classifiers["AdaBoostClassifier"] =  AdaBoostClassifier()  
        trainedClassifiers = {}
        for name, sklearn_classifier in classifiers.items():
            classifier = nltk.classify.SklearnClassifier(sklearn_classifier)
            classifier.train(train)
            trainedClassifiers[name] = classifier
        return trainedClassifiers
    except Exception as e:
        print(f'Error in training sklearn classifiers in trainSKLearnClassifers function.\nException details\n{e}')


def getAccuracyofClassifier(classifier,test):
    """
    Returns the accuracy of the model based upon input training data. 

    Args:
        classifier (NLTK Classifier or SKLeanr Classifier): A trained classifier object. 
        test (List): List of tuples in the form [({features},goal)]

    Returns:
        float: Accuracy of model between 0 and 1. 
    """
    try:
        return nltk.classify.accuracy(classifier, test)
    except Exception as e:
        print(f'Error in getting accuracy of the model.\nException details {e}')

def saveClassifier(classifier,file):
    """
    This function saves the classifier to a pickle file. 

    Args:
        classifier (Classifier Obj): the classifier to be saved.
        file (String): The file path to save the classifier too. 
    """
    try:
        saveFile = open(file,"wb")
        pickle.dump(classifier,saveFile)
        saveFile.close()
    except Exception as e:
        print(f'Error in saving classifier to file in dunction saveClassifier.\nException details\n{e}')

def generateEvaluationReport(results,file):
    """
    Writes the evaluation results to a csv file. 

    Args:
        results (dict): Dictionary of row values for evaluation
        file (Sting): File to save the evaluation results to. 
    """
    try:
        df = pd.DataFrame.from_dict(results) 
        df.to_csv(file, index = False, header=True)
    except Exception as e:
        print(f'Error in writing evaluation results to csv.\nException detials:\n{e}')

def loadClassifier(file):
    """
    Loads in a pickle file containing the machine learning classifier.
    Args:
        file (String): The path to the classifier. 
    Returns:
        (SklearnClassifier or NLTKClassifier): The classifier which can be used to classify news headlines. 
    """
    try:
        classifierFile = open(file,"rb")
        classifier = pickle.load(classifierFile)
        classifierFile.close()
        return classifier
    except Exception as e:
        print(f'ERROR:Occured in the loadClassifier function.\nException Details:\n\t{e}')

def evaluateModel(classifier, test):
    """This function takes in a classifier and generates a reference and a test set for
    calculating the precision, recall, accuracy and f_measure

    Args:
        classifier : A trained model
        test : the test data

    Returns:
        A dict of each classifier with name of metric as key and the related scores as values
    """
    evaluations = {}

    referenceSets = collections.defaultdict(set)
    testsets = collections.defaultdict(set)

    for i, (feats, label) in enumerate(test):
        referenceSets[label].add(i)
        observed = classifier.classify(feats)
        testsets[observed].add(i)

    # Accuracy 
    accuracy_score = nltk.classify.accuracy(classifier, test)
    evaluations["accuracy"] = f"{accuracy_score:.2%}"
    # Precision 
    precision_score = precision(referenceSets["positive"], testsets["positive"])
    precision_score_neg = precision(referenceSets["negative"], testsets["negative"])
    evaluations["positive precision"] = f"{precision_score:.2%}"
    evaluations["negative precision"] = f"{precision_score_neg:.2%}"
    # Recall
    recall_score = recall(referenceSets["positive"], testsets["positive"])
    recall_score_neg = recall(referenceSets["negative"], testsets["negative"])
    evaluations["positive recall"] = f"{recall_score:.2%}"
    evaluations["negative recall"] = f"{recall_score_neg:.2%}"
    # F Measure
    f_measure_score = f_measure(referenceSets["positive"], testsets["positive"])
    f_measure_score_neg = f_measure(referenceSets["negative"], testsets["negative"])
    evaluations["positive f_measure"] = f"{f_measure_score:.2%}"
    evaluations["negative f_measure"] =  f"{f_measure_score_neg:.2%}"
    return evaluations

def evaluateTopModels(evalFile):
    """
    Description:
        This function reads in the evaluation file gnerated by the function generateEvaluationReport. 
        It then gets the top models for each metric outpus them to the console and generates a report to
        highestEvaluationResults.csv file. 

    Args:
        evalFile (String): Path to the evaluation report
    """
    try:
        # Read in the csv file 
        df = pd.read_csv(evalFile,index_col=[0])
        # Obtained from stack overflow
        for col in df:
            if col != "model":
                df[col] = df[col].str.rstrip('%').astype('float') /100.0
        # Get the maxIds  
        maxIds = (df.idxmax())
        # Open file to write results to and write header 
        f = open('./highestEvaluationResults.csv', 'w', newline='')
        writer = csv.writer(f)
        writer.writerow(['evaulation metric','model','score'])
        # Print results to terminal and write them to csv file 
        print(f'\t******Highest Evaluation Results*******')
        for index, value in maxIds.items():
            print(f' \033[1m{index :<20}\033[0m - {value :>20} ({df[index][value]:.2%})')
            writer.writerow([index,value,f'{df[index][value]:.2%}'])
        
    except Exception as e:
        print(f'ERROR:Occured in the showResults function.\nException Details:\n\t{e}')

def generateEvaluationReport2(results, file):
    """
    Writes the evaluation results to a csv file. 

    Args:
        results (dict): Dictionary of row values for evaluation
        file (Sting): File to save the evaluation results to. 
    """
    try:
        df = pd.DataFrame.from_dict(results)
        df.to_csv(file, index=False, header=True)
    except Exception as e:
        print(f"Error in writing evaluation results to csv.\nException detials:\n{e}")




    
    