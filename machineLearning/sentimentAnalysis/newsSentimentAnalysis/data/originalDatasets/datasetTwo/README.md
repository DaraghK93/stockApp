# Dataset Two - Sentiment Analysis for Financial News

## Description
Dataset contains headlines and the labelled sentiment of these headlines relating to financial news stories. The data was scraped from LexisNexis database and sentiments annotated by 5-8 annotators. The dataset is split up into number of instances >=50% annotators agree, instances >=66% annotators agree, instances >=75% annotators agree, number of instances 100% annotators agree.

## Source of Data 
https://www.kaggle.com/datasets/ankurzing/sentiment-analysis-for-financial-news or there is a bit of better description here https://huggingface.co/datasets/financial_phrasebank

## Number of Records 
1. 50% or greater annotator agreement: 4846 
2. 66% or greater annotator agreement: 4217 
3. 75% or greater annotator agreement: 3453 
4. 100% annotator agreement: 2264 

## Features 
| Feature Name       | Type  | Range     | Description  |
| ----------- | ----------- | ----------- | ----------- |
| Headline       | String       | NA      | The headline of the article       |
| Label   | String        | Positive, Negative, Neutral      | Label used for supervised learning to train model for sentiment analysis.        |


## Acknowledgements
Malo, P., Sinha, A., Korhonen, P., Wallenius, J., & Takala, P. (2014). Good debt or bad debt: Detecting semantic orientations in economic texts. Journal of the Association for Information Science and Technology, 65(4), 782-796.
