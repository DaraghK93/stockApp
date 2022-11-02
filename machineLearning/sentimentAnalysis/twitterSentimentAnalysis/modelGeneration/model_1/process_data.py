import sys
import os
import nltk
import csv
import pandas as pd
import string

sys.path.append("../../../bin")

from dataCleaning import cleaningFunctions


def main():

    # file paths
    dataset1_loc = "../../datasets/dataset1.csv"
    dataset2_loc = "../../datasets/dataset2.csv"
    word_dict_loc = "../../datasets/Loughran-McDonald_MasterDictionary_1993-2021.csv"

    # read in the files to data frames
    dataset1 = cleaningFunctions.readCSVFile(dataset1_loc)
    dataset2 = cleaningFunctions.readCSVFile(dataset2_loc)
    fin_dict = cleaningFunctions.readCSVFile(word_dict_loc)

    # clean the data and get into the same format
    dataset1_cleaned = cleaningFunctions.convert_sentiment_score_to_word(dataset1)

    dataset2 = cleaningFunctions.remove_unwanted_columns(dataset2)
    dataset2_cleaned = cleaningFunctions.convert_sentiment_score_to_word(dataset2)

    # remove URLs and Hashtags and punctuation etc
    dataset1_cleaned = cleaningFunctions.removeUrlAndHashtag(dataset1_cleaned)
    dataset2_cleaned = cleaningFunctions.removeUrlAndHashtag(dataset2_cleaned)

    # writing cleaned dataset to file
    cleaningFunctions.writeToFile(
        dataset1_cleaned,
        "../../cleanedDatasets/dataset1.csv",
    )

    cleaningFunctions.writeToFile(
        dataset2_cleaned,
        "../../cleanedDatasets/dataset2.csv",
    )

    # clean the word dict
    fin_dict = cleaningFunctions.drop_columns(
        fin_dict,
        [
            "Seq_num",
            "Word Proportion",
            "Average Proportion",
            "Std Dev",
            "Doc Count",
            "Litigious",
            "Strong_Modal",
            "Weak_Modal",
            "Constraining",
            "Syllables",
            "Source",
        ],
    )

    # create words lists files write them to a file sorted
    pos_words = cleaningFunctions.getSentimentWordsFromDict(fin_dict, "Positive")
    cleaningFunctions.writeToFile(
        pos_words.sort_values(by="Count", ascending=False),
        "../../cleanedDatasets/pos_words.csv",
    )
    neg_words = cleaningFunctions.getSentimentWordsFromDict(fin_dict, "Negative")
    cleaningFunctions.writeToFile(
        neg_words.sort_values(by="Count", ascending=False),
        "../../cleanedDatasets/neg_words.csv",
    )
    neutral_words = cleaningFunctions.getSentimentWordsFromDict(fin_dict, "Uncertainty")
    cleaningFunctions.writeToFile(
        neutral_words.sort_values(by="Count", ascending=False),
        "../../cleanedDatasets/neutral_words.csv",
    )

    # shuffle dataset2 limit it and combine them for a total of 20000 datapoints to work with
    dataset2_cleaned = dataset2_cleaned.sample(frac=1).reset_index(drop=True)

    combined_dataset = cleaningFunctions.combineDatasets(
        [dataset1_cleaned, dataset2_cleaned.iloc[:17000]]
    )

    # write combined dataset to file
    cleaningFunctions.writeToFile(
        combined_dataset,
        "../../cleanedDatasets/combined.csv",
    )


if __name__ == "__main__":
    main()
