# NewsSentimentLambdaFunction
This lambda function will run every 30 minutes scraping news sources and classifying them into positive, neutral or negative. 

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

- newsSentiment - Code for the application's Lambda function and Project Dockerfile.
- events - Invocation events that you can use to invoke the function. (Just left as the default for now function doesnt really use it)
- tests - Unit tests for the application code. (Still need to update these)
- template.yaml - A template that defines the application's AWS resources. 
- samconfig.toml - Defaults used for deploying lambda function. 

The application uses several AWS resources. These resources are defined in the `template.yaml` file in this project. You need to understand this file to add resources to your lambda function/change defualts, see [here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification.html)

## Tutorials and Prerequistes 
See the tutorial [here](https://aws.amazon.com/blogs/compute/using-container-image-support-for-aws-lambda-with-aws-sam/), its quite straight forward but it explains how this function was created.  

Before you start you need to install a few things. 

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

The docker image uses **Python 3.9**. 

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
NewsSentimentLambdaFunction$ sam build
```

The SAM CLI builds a docker image from a Dockerfile and then installs dependencies defined in `newsSentiment/requirements.txt` inside the docker image. The processed template file is saved in the `.aws-sam/build` folder.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
NewsSentimentLambdaFunction$ sam local invoke
```

## Deploy the sample application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

As I have deployed this function before you can just use the command below to deploy the function. 

```bash
NewsSentimentLambdaFunction$ sam build
NewsSentimentLambdaFunction$ sam deploy 
```
The default configs for deployment have been set in the file ```samconfig.toml```. 

To deploy a new application for the first time see the tutorial  [here](https://aws.amazon.com/blogs/compute/using-container-image-support-for-aws-lambda-with-aws-sam/)

## Adding CRON event to function 
The function executes every 30 minutes using AWS EventBridge. To add this resource the ```template.yaml``` file was modified to include the following event with the function ```NewsSentimentFunction```. 
Read more on the ```Schedule``` event [here]( https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-property-function-schedule.html) before just copying and pasting below code. 

```
Events:
        NewsSentimentSchedule:
          Type: Schedule
          Properties:
            Schedule: 'rate(30 minutes)'
            Name: NewsSentimentSchedule
            Description: This schedule triggers the newsSentimentLambdaFunction to execute every 30 minutes scraping news headlines and classifying them into positive, neutral or negative. 
            Enabled: true
```


## Adding more resources
The application template uses AWS Serverless Application Model (AWS SAM) to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources such as functions, triggers, and APIs. For resources not included in [the SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use standard [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) resource types.

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs generated by your deployed Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

`NOTE`: This command works for all AWS Lambda functions; not just the ones you deploy using SAM.

```bash
NewsSentimentLambdaFunction$ sam logs -n NewsSentimentFunction --stack-name NewsSentimentLambdaFunction --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `tests` folder in this project. Use PIP to install the [pytest](https://docs.pytest.org/en/latest/) and run unit tests from your local machine.

```bash
NewsSentimentLambdaFunction$ pip install pytest pytest-mock --user
NewsSentimentLambdaFunction$ python -m pytest tests/ -v
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name NewsSentimentLambdaFunction
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
