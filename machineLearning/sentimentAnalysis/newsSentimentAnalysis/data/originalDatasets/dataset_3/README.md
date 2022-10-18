# Dataset Two - Sentiment analysis of Entities in News headlines

## Description
This dataset is a human labelled dataset consisting of political news headlines. The purpose of this dataset was for training entity level sentiment machine learning models. 
The dataset is split into a few seperate files:

1. SEN_en_AMT.csv - English headlines annotated using the Amazon Mechanical Turk service. 
2. SEN_en_AMT_nooutlier.csv - English headlines annotated using the Amazon Mechanical Turk service with no outliers.
3. SEN_en_R.csv - English headlines annotated by researchers. 
4. SEN_en_R_nooutliers.csv - English headlines annotated by researchers with no outliers. 

## Source of Data 
The dataset was part of a research paper, it is a restricted dataset and access has to be requested for it [here](https://zenodo.org/record/5211931#.Y06HGXbMJPZ)

## Number of Records 
1. SEN_en_AMT.csv - 1361
2. SEN_en_AMT_nooutlier.csv - 1344
3. SEN_en_R.csv - 1270
4. SEN_en_R_nooutliers.csv - 1119

## Features
| Feature Name       | Type  | Range     | Description  |
| ----------- | ----------- | ----------- | ----------- |
| headline       | String  | NA     | The headline of the news article  |
| entity       | String  | NA     | The entity/topic of the headline  |
| majority_label       | String  | neg, neutr, pos, unk     | The headline of the news article  |

## Acknowledgements
Baraniak, K., & Sydow, M. (2021). A dataset for Sentiment analysis of Entities in News headlines (SEN). Procedia Computer Science, 192, 3627–3636. doi:10.1016/j.procs.2021.09.136