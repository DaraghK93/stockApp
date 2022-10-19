## Description:
#   This file holds functions for feature extraction 

import nltk 

from nltk.tokenize import word_tokenize


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

def tokenize(headline):
    """
    Tokenizes and individual headline. Headlines also converted to lower case in this process. 

    Args:
        headline (String): A string representing a headline 

    Returns:
        tokens(List): List of strings, each element is a word in the headline.
    """
    try:
        tokens = word_tokenize(headline)
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


    



if __name__ == "__main__":
    nltk.download([
        "stopwords"
    ])
