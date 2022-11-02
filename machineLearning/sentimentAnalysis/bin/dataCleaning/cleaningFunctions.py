import pandas as pd
import json 
import chardet
import string

def readCSVFile(filepath,encoding='utf8',index_col=None):
    """
    Reads in csv file to Pandas dataframe

    Args:
        filepath (string): relative file path 
        encoding (string): The encoding of the file being read - Optional 
        index_col (Int): If there is an index column to be used - Optional 

    Returns:
        df (pandas Dataframe): Pandas dataframe with csv in it 
    """
    try:
        df = pd.read_csv(filepath,encoding=encoding,index_col=index_col)
        return df
    except Exception as e:
        print(f'Error reading in file. Exception details\n{e}')

def writeToFile(df,filepath):
    """
    This function writes a pandas dataframe to a file 

    Args:
        df (Pandas Dataframe): A pandas dataframe object. 
        filepath (string): The filepath to write to
    """
    try:
        df.to_csv(filepath,index=False)
        # leave in a print statment makes it easier to tell in console if file has actually been written to 
        print(f'File {filepath} written to')
    except Exception as e:
        print(f'Error in writing dataframe to file. Exception details\n{e}')

def detectFileEncoding(filepath):
    """
    Detects the file encoding of a file. 

    Args:
        filepath (string): The file path. 

    Returns:
        (string): The file enconding 
    """
    try:
        with open(filepath, 'rb') as rawdata:
            # Detect the file format 
            result = chardet.detect(rawdata.read(100000))
        return result['encoding']
    except Exception as e:
        print(f'Error in detecting file format in detectFileFormat function. Exception details\n{e}')


def datasetOneRemoveMultipleTopics(df):
    """
    In dataset one the "decisions" column is a JSON object. 
    The key is the topic and the value is the sentiment of that topic in the headline. 
    This function removes values which have multiple topics only focusing on one. 

    Args:
        df (pandas Dataframe): Pandas dataframe of dataset_1.csv

    Returns:
        newDF(pandas Dataframe): New dataframe with the cols sentiment, headline, words and topic with the multiple topics entrys removed. 
    """
    try:
        newRecords = [] 
        for _, row in df.iterrows():
            # decisions is a dictonary, there can be multiple decisions if there are multiple topics 
            decisions = json.loads(row['Decisions'])
            # If a decision is lenght 1 then only 1 topic
            if len(decisions) == 1:
                # The key to the decision will be the topic 
                topic = list(decisions.keys())[0]
                sentiment = decisions[topic]
                # Create a new row using this information 
                newRow = {'sentiment':sentiment,'headline': row['Title'],'words':row['Words'],'topic':topic}
                newRecords.append(newRow)
        # Create a dataframe from these new records 
        newDF = pd.DataFrame.from_records(newRecords)
        return newDF
    except Exception as e:
        print(f'Error in removng multiple topics from datasetOne. Exception details\n{e}')



def addWordCount(df):
    """
    This function counts the words in the "headline" column.

    Args:
        df (Pandas Dataframe): A pandas dataframe with a column called "headline"

    Returns:
        df (Pandas Dataframe): Pandas dataframe with new column called "words"
    """
    try:
        df['words'] = df['headline'].str.count(' ') + 1
        return df
    except Exception as e:
        print(f'Error in getting word count in addWordCount function. Exception details\n{e}')


def deleteValues(df,col,val):
    """
    Used to delete entries based upon the value in particular column. 
    The entire row will be deleted. 

    Args:
        df (Pandas Dataframe): Dataframe to delete values in 
        col (String): Column name to delete values in 
        val (String): The value to delete

    Returns:
        _type_: _description_
    """
    try:
        df = df[df[col] != val]
        df.reset_index(drop=True, inplace=True)
        return df
    except Exception as e:
        print(f'Error in deleteing words in deleteValues function. Exception details\n{e}')
    


def replaceValues(df,values,replacementValues,col):
    """
    Used to replace values in a dataframe. 

    Args:
        df (Pandas Dataframe): The pandas dataframe to replace values. 
        values (List): List of values to replace, must be same length as replacementValues input. 
        replacementValues (List): List of values to replace with, must be same length as replacementValues input.
        col (string): The column name the values will be replaced in

    Returns:
        df (Pandas Dataframe): Updated pandas dataframe with removed values. 
    """
    try:
        df[col] = df[[col]].replace(values,replacementValues)
        return df
    except Exception as e:
        print(f'Error in replacig values function. Exception details {e}')


def removeColumn(df,col):
    """
    Removes a specific column within a dataframe

    Args:
        df (Pandas Dataframe): Pandas dataframe with a column to drop in it
        col (String): The name of the column to drop. 

    Returns:
        df(Pandas Dataframe): Dataframe with the column removed 
    """
    try:
        df = df.drop(col,axis=1)
        return df
    except Exception as e:
        print(f'Error in removing column. Exception details {e}')


def combineDatasets(frames):
    try:
        df = pd.concat(frames,ignore_index=True)
        return df
    except Exception as e:
        print(f'Error in combining datasets. Exception details {e}')


def convert_sentiment_score_to_word(data):
    """This function is for twitter sentiment datasets where the classification
    results are either 0,2,4 for neg, neu, pos. 
    OR VADER sentiment scores -1 -> +1 

    Args:
        dataFrame with data

    Returns:
        Same dataFrame but with new sentiment col with 'positive' or 'negative' instead of numbers
    """
    values = []
    for index, row in data.iterrows():
        if row["sentiment"] < 0 and row["sentiment"] > -1 or row["sentiment"] == 0:
            values.append("Negative")
        elif row["sentiment"] > 0 and row["sentiment"] < 1 or row["sentiment"] == 4:
            values.append("Positive")
        elif row["sentiment"] == 2:
            values.append("Neutral")

    values = pd.DataFrame(values)

    data.drop(["sentiment"], axis=1)
    data["sentiment"] = values

    return data

def remove_unwanted_columns(data):
    """Takes datasets of tweet data and remoes any col that is not labelled tweet or sentiment

    Args:
        dataframe

    Returns:
        cleaned dataframe with unwanted columns dropped
    """
    columns_to_drop = []
    for column in data.columns:
        if column != "sentiment" and column != "tweet":
            columns_to_drop.append(column)

    clean_data = data.drop(columns_to_drop, axis=1)
    clean_data = clean_data.reindex(columns=["tweet", "sentiment"])
    return clean_data
    
def removeUrlAndHashtag(data):
    """
    This function takes in a dataframe and returns the same dataframe free of URLs, tagged users, hashtags
    and all in lower case. Punctuation is also removed here

    The 'tweet' column is the column that's changed. Can easily expand this to be any column if needed

    Args:
        dataframe

    Returns:
        cleaned dataframe
    """
    tweetCol = []

    for index, row in data.iterrows():
        newTweet = []
        for word in row["tweet"].split(" "):
            if word.startswith("@") and len(word) > 1:
                word = "@user"
            elif word.startswith("http"):
                word = "http"
            elif word.startswith("#") and len(word) > 1:
                word = "#"
            elif word.startswith("$") and len(word) > 1:
                word = "$"
            # remove punctuation from the words also
            word = word.translate(str.maketrans("", "", string.punctuation))
            # create new tweet - list of words
            newTweet.append(word.lower())
        # join the words in tweet list together separated by a space and add to tweet column list
        tweetCol.append(" ".join(newTweet))
    # create a dataframe to replace old tweet column
    tweetCol = pd.DataFrame(tweetCol)

    data.drop(["tweet"], axis=1)
    data["tweet"] = tweetCol

    return data

def drop_columns(data, col):
    """This function takes in a data frame and drops the columns in col

    used for financial dictionary to drop all non necessary sentiment cols

    Args:
        data: dataframe
        col: columns to drop

    Returns:
        cleaned dataframe
    """
    data_cleaned = data.drop(col, axis=1)
    return data_cleaned

def getSentimentWordsFromDict(data, sentiment):
    """This function takes in a dataframe and returns all the entries of that 'sentiment'

    Positive neutral or negative from the financial dictionary

    Args:
        data (_type_): dataframe
        sentiment (_type_): string of sentiment 'positive' 'negative' etc

    Returns:
        dataframe of the words of that sentiment
    """
    sentiment_words = []
    sentiment_count = []
    sentiment_word_df = pd.DataFrame()

    for index, row in data.iterrows():
        if row[f"{sentiment}"] > 0:
            sentiment_words.append(row["Word"].lower())
            sentiment_count.append(row["Word Count"])
    sentiment_word_df["Word"] = sentiment_words
    sentiment_word_df["Count"] = sentiment_count
    return sentiment_word_df

    



