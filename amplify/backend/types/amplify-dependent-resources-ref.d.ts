export type AmplifyDependentResourcesAttributes = {
    "function": {
        "newsArticleScrapingAndSentimentAnalysis": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string",
            "CloudWatchEventRule": "string"
        }
    },
    "api": {
        "stockapi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}