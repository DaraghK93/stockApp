FROM public.ecr.aws/lambda/python:3.9

COPY app.py requirements.txt ./

# Copy the entire contents of the MLData directory to the docker image 
ADD MLData /var/task/MLData

# Run an ls, makes it easier to see that the contents have actually been copied 
RUN ls -la /var/task/MLData

# Copy the entire contents of the nltk_data directory to the docker image 
ADD nltk_data /var/task/nltk_data

# Run an ls, makes it easier to see that the contents have actually been copied 
RUN ls -la /var/task/nltk_data

RUN python3.9 -m pip install -r requirements.txt -t .

# Command can be overwritten by providing a different command in the template directly.
CMD ["app.lambda_handler"]
