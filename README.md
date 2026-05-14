* Weekly To Do List *

A full-stack serverless to do list app built with React and AWS. Users can add, complete, and delete tasks organized by day of the week.

* Tech Stack

- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- Python
- React
- JavaScript
- CSS

* Features

- Add tasks by day of the week
- View tasks in a weekly calendar layout
- Mark tasks as completed
- Delete tasks
- Stores tasks in DynamoDB through a serverless AWS backend

* Architecture

- React Frontend: Sends HTTP requests to API Gateway using the fetch() function.
- API Gateway: Public entry point for the backend, middleman between the frontend and Lambda/DynamoDB. 
- AWS Lambda: Contains the backend logic written in Python, checks the HTTP method, and decides which action to perform. 
- Amazon DynamoDB: NoSQL database for storing tasks.

