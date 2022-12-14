## Description:
#   This file holds functions for feature extraction 

import nltk 
from nltk.tokenize import RegexpTokenizer
from nltk.sentiment import SentimentIntensityAnalyzer
from statistics import mean
sia = SentimentIntensityAnalyzer()
import csv
import pandas as pd

def getHeadlineBySentiment(df,sentiment):
    """
    This function gets a list of headlines with a particular sentiment

    Args:
        df (Pandas Dataframe): A dataframe object with the columns of headlines and sentiment
        sentiment (String): The sentiment to extract. 

    Returns:
        headlines (list): List of headlines all callified as input sentiment. 
    """
    try:
        headlines = list(df[df['sentiment'] == sentiment]['headline'])
        return headlines
    except Exception as e:
        print(f'Error in extracting given sentiment headlines in function getHeadlineBySentiment.\nException details\n{e}')

### Basically the same as above but changing 'tweet' and 'headline' Don't want to change Warrens code without discussing first
def getTweetBySentiment(df, sentiment):
    """
    This function gets a list of headlines with a particular sentiment

    Args:
        df (Pandas Dataframe): A dataframe object with the columns of headlines and sentiment
        sentiment (String): The sentiment to extract.

    Returns:
        headlines (list): List of headlines all callified as input sentiment.
    """
    try:
        tweets = list(df[df["sentiment"] == sentiment]["tweet"])
        return tweets
    except Exception as e:
        print(
            f"Error in extracting given sentiment headlines in function getHeadlineBySentiment.\nException details\n{e}"
        )

def tokenize(headline):
    """
    Tokenizes and individual headline. Headlines also converted to lower case in this process. 

    Args:
        headline (String): A string representing a headline 

    Returns:
        tokens(List): List of strings, each element is a word in the headline.
    """
    try:
        # Only match words not symbols 
        tokenizer = RegexpTokenizer(r'\w+')
        tokens = tokenizer.tokenize(headline)
        tokens = [t.lower() for t in tokens]
        return tokens 
    except Exception as e:
        print(f'Error in tokenizing headline in function tokenize .\nException details\n{e}')


def tokenizeHeadlines(headlines):
    """
    Tokenizes a list of headlines and returns all tokens in one dimentional array.

    Args:
        headlines (list): List of string where each string is a headline.

    Returns:
        tokens(List): List of stings where each element is a word. 
    """
    try:
        tokens = [] 
        for headline in headlines:
            toks = tokenize(headline)
            tokens.extend(toks)
        return tokens
    except Exception as e:
        print(f'Error in tokenizing headlines in function tokenizeHeadlines .\nException details\n{e}')

def removeStopWords(wordsList):
    try:
        # Get the stopwords from nltk 
        stopwords = nltk.corpus.stopwords.words("english")
        # Remove them and create a new list 
        stopWordsRemoved = [word.lower() for word in wordsList if word.lower() not in stopwords]
        return stopWordsRemoved
    except Exception as e:
        print(f'Error in removing stop words in function removeStopWords.\nException details\n{e}')


def getFreqDist(tokens):
    """
    Returns a frequency distribution object for list of tokens. 
    Read more about frequency distribution here https://tedboy.github.io/nlps/generated/generated/nltk.FreqDist.html

    Args:
        tokens (List): List of tokens, for example could be list of words. 

    Returns:
        (FreqDist): A frequency distribution object. 
    """
    try:
        return nltk.FreqDist(tokens)
    except Exception as e:
        print(f'Error in creating freq distribution in getFreqDist function.\nException details\n{e}')

def convertListToLowerCase(wordsList):
    """
    Converts a list of words to lower case.

    Args:
        wordsList (List): List of strings. 

    Returns:
        wordsLower(List): A list of strings converted to lower case
    """
    try:
        wordsLower = []
        for word in wordsList:
            wordsLower.append(word.lower())
        return wordsLower
    except Exception as e:
        print(f'Error in cinverting words to lower case in function convertListToLowerCase.\n Exception Details {e}')


def getWordCount(sentence,listOfWords):
    """
    Gets the word count of certain words appearing in sentence. 

    Args:
        sentence (String): The sentence to search in 
        listOfWords (List): The words to search for

    Returns:
        wordCount(Int): Integer representing the word count. 
    """
    wordCount = 0
    # Make sure words are tokenized and lower case 
    words = tokenize(sentence)
    # Make sure words list is lower case, will already be tokenized as its list 
    wordsList = convertListToLowerCase(listOfWords)
    for word in words:
        if word.lower() in wordsList:
            wordCount+=1
    return wordCount


def getPolarityScore(sentence):
    """
    Calculates polarity scores using NLTK's sentiment analyiser.

    Args:
        sentence (String): Sentence string to calculate polarity of. 

    Returns:
        scores (dict): A dictionary with the keys 'neg', 'neu', 'pos' and 'compound'
    """
    try:
        scores = sia.polarity_scores(sentence)
        return scores
    except Exception as e:
        print(f'Error in calculating polarity scores in function getPolarityScore.n\nException details\n{e}' )

def extractFeatures(headline,posWords,negWords,neuWords=False):
    """
    This function uses other functions to extract features of an inputted headline. 
    The result of this function will be a dictonary object with the feature name as the key and value of that feature as the value. 

    Args:
        headline (String): The headline string to generate features for
        posWords (List): A positive words list to use in counting the positive words in the headline 
        negWords (List): A negative words list to use in counting the negative words in the headline. 

    Returns:
        features(dict): Dictionary where the keys are the feauture names. 
    """
    try:
        posWordCount   = 0 
        negWordCount   = 0 
        neuWordCount   = 0 
        compoundScores  = list()
        positiveScores = list()
        negativeScores = list()
        neutralScores  = list()
        features       = {}
        # Do it by sentence as there could be multiple sentences in a headline with different polarity scores 
        for sentence in nltk.sent_tokenize(headline):
            # Update the positive and negative word count 
            posWordCount   += getWordCount(sentence,posWords)
            negWordCount   += getWordCount(sentence,negWords)
            if neuWords: neuWordCount  += getWordCount(sentence,neuWords)
            # Get the polarity score of the sentence 
            polarityScores = getPolarityScore(sentence)
            compoundScores.append(polarityScores["compound"])
            positiveScores.append(polarityScores["pos"])
            negativeScores.append(polarityScores["neg"])
            neutralScores.append(polarityScores["neu"])
        
        # Calculate the mean of the headlines polarity scores, +1 to meanCompund as some nltk models wont work with negative 
        features["meanCompound"] = mean(compoundScores)+1
        features["meanPositive"] = mean(positiveScores)
        features["meanNegative"] = mean(negativeScores)
        features["meanNeutral"]  = mean(neutralScores)

        # Add the word count to the features 
        features["posWordCount"] = posWordCount
        features["negWordCount"] = negWordCount
        if neuWords: features["neuWordCount"] = neuWordCount
        return features
    except Exception as e:
        print(f'Error in extraing features in function extractFeatures.\nException details:\n{e}')

def writeWordsListToCSV(freqDist,file,numWords=100):
    """
    Writes a list of words to a csv file 

    Args:
        freqDist (Frequency distribution Object): A frequency distribution of tokenized words
        file (String): The location of the file to write to
    """
    with open(file,'w',newline='') as f:
        write = csv.writer(f)
        write.writerow(['word','occurences'])
        for row in freqDist.most_common(numWords):
            write.writerow(row)
        f.close()

    
def readWordFileToList(file):
    """
    Takes in file name for words list in csv format and returns qwords in one dimensional array. 
    It assumes the words file has two columns, column headers and the first column contains the words. 
    Args:
        file (String): The path of the file to read
    Returns:
        words (List): One dimensional list of words. 
    """
    try:
        words = [] 
        with open(file,"r") as wordFile:
            csvReader = csv.reader(wordFile)
            # Skip the header in first lin
            next(csvReader)
            for line in csvReader:
                # 0th eleeent as the word is here, occurences in 1st element 
                words.append(line[0])
        return words
    except Exception as e:
        print(f'ERROR:Occured in the readWordFileToList function.\nException Details:\n\t{e}') 
def removeStopWordsFromTweet(data):
    """
    This function takes in a dataframe of tweets and returns each string free of stopwords

    Args:
        data (_type_): dataframe of tweets

    Returns:
        _type_: cleaned dataframe
    """
    tweetCol = []

    stopwords = nltk.corpus.stopwords.words("english")

    for index, row in data.iterrows():
        newTweet = []
        for word in row["tweet"].split(" "):
            if word not in stopwords:
                # create new tweet - list of words
                newTweet.append(word.lower())
        # join the words in tweet list together separated by a space and add to tweet column list
        tweetCol.append(" ".join(newTweet))
    # create a dataframe to replace old tweet column
    tweetCol = pd.DataFrame(tweetCol)

    # replace old tweet with newly created one stopwords free
    data.drop(["tweet"], axis=1)
    data["tweet"] = tweetCol

    return data    
     


if __name__ == "__main__":
    nltk.download([
        "stopwords"
    ])
