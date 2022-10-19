## Description:
#   This file holds functions for feature extraction 

import nltk 

from nltk.tokenize import word_tokenize, RegexpTokenizer


def processText(headlines):
    tokens = [] 
    tokenizer = RegexpTokenizer(r'\w+')
    stopwords = nltk.corpus.stopwords.words("english")
    print(stopwords)


if __name__ == "__main__":
    nltk.download([
        "stopwords"
    ])
