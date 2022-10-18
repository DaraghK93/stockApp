## Description
#   This file holds reusable functions for data exploration 

import seaborn as sns
import matplotlib.pyplot as plt

sns.set(style='darkgrid')
#sns.set(font_scale=2)

def plotSentimentSplit(df,title,file=None):
    ax = sns.countplot(data=df,
                        x="sentiment",
                        palette={"positive":"Green","neutral":"Orange","negative":"Red"},
                        order = df['sentiment'].value_counts().index
                        )
    ax.set(title=title)
    ax.bar_label(ax.containers[0])
    if file:
        fig = ax.get_figure()
        fig.savefig(file)
