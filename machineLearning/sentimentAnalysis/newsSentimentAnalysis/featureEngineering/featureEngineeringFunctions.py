## Description:
#   This file holds functions for feature extraction 

import nltk 

from nltk.tokenize import word_tokenize, RegexpTokenizer


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


def processText(headlines):
    tokens = [] 
    tokenizer = RegexpTokenizer(r'\w+')
    stopwords = nltk.corpus.stopwords.words("english")
    print(stopwords)


if __name__ == "__main__":
    nltk.download([
        "stopwords"
    ])
