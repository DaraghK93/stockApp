FROM public.ecr.aws/lambda/python:3.9

COPY app.py requirements.txt ./

ADD DataSet /var/task/DataSet

RUN ls -la /var/task/DataSet

RUN python3.9 -m pip install -r requirements.txt -t .

# Command can be overwritten by providing a different command in the template directly.
CMD ["app.lambda_handler"]
