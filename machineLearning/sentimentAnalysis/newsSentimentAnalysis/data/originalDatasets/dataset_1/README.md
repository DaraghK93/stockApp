# Dataset One - Aspect based Sentiment Analysis for Financial News
## Description
This dataset is targeted towards the problem of having multiple subtopics within a financial news headline with each topic having a different topic. The dataset labels the sentiment of the news headline by topic for example in one headline Tesla can have a positive sentiment and Microsoft a negative sentiment.

## Source of Data
Obtained from Kaggle [here](https://www.kaggle.com/datasets/ankurzing/aspect-based-sentiment-analysis-for-financial-news)

## Number of Records
10,700+ records of which 2800+ contain multiple topics. There are 4100+ positive entries, 3200+ negative entries and 4500+ neutral entries. 

## Features 
| Feature Name       | Type  | Range     | Description  |
| ----------- | ----------- | ----------- | ----------- |
| S No       | Int       | 1-10754      | Unique serial number for article       |
| Title   | String        | NA     | The headline of the article. |
| Decisions   | Dictionary were the key is the topic and value is the sentiment.          | Positive, Negative, Neutral for sentiment     | Label used for supervised learning to train model for sentiment analysis.        |
| Words   | Integer | 3 to 23   | The number of words in the news headline.  |

## Acknowledgements
Sinha, A., Kedas, S., Kumar, R., & Malo, P. (2022). SEntFiN 1.0: Entity‐aware sentiment analysis for financial news. Journal of the Association for Information Science and Technology.
DOI: https://doi.org/10.1002/asi.24634