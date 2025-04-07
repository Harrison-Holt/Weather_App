To-Do List Backend API
🚀 AWS Serverless Backend for a To-Do List App using Lambda, API Gateway, RDS (MySQL/PostgreSQL), Cognito, and EC2

📝 Table of Contents
Introduction
Tech Stack
Architecture Overview
Setup & Deployment
API Endpoints
1️⃣ User Registration
2️⃣ User Login
3️⃣ Delete Account
4️⃣ Create Task
5️⃣ Delete Task
6️⃣ Update Task
7️⃣ Complete Task
Security & Authentication
Testing with Postman
Future Improvements
📌 Introduction
This backend API provides user authentication and task management features using AWS Cognito, Lambda, API Gateway, and RDS (MySQL/PostgreSQL).
✅ Secure authentication with Cognito
✅ Serverless API with AWS Lambda
✅ Data storage in Amazon RDS (interacted via EC2)
✅ Public-private Lambda architecture for security

🛠 Tech Stack
✅ AWS Lambda – Serverless backend logic (Node.js)
✅ Amazon API Gateway – Routes HTTP requests
✅ Amazon Cognito – User authentication and token management
✅ Amazon RDS (MySQL/PostgreSQL) – Relational database storage
✅ Amazon EC2 – For direct database interaction and administration
✅ AWS IAM Roles – Secure role-based access
✅ AWS CloudWatch – Logs and monitoring
✅ AWS SNS (Optional) – Notifications

🌐 Architecture Overview
scss
Copy
Edit
[Frontend] → API Gateway → Public Lambda (Auth) → Cognito (User Management)
                         → Public Lambda (Tasks) → Private Lambda → RDS (via VPC)
                         → EC2 (For DB Administration)
                         → CloudWatch (Logging & Monitoring)
✅ Public Lambdas: Handles user authentication (login, registration) and task requests
✅ Private Lambda: Handles secure interactions with Amazon RDS
✅ Amazon Cognito: Manages user authentication and authorization
✅ Amazon RDS (MySQL/PostgreSQL): Stores tasks with user_id and task_id
✅ EC2 Instance: Allows manual database interaction for debugging
✅ API Gateway: Routes HTTP requests to the appropriate Lambda functions

⚙️ Setup & Deployment
1️⃣ Clone Repository
bash
Copy
Edit
git clone https://github.com/yourusername/todo-list-backend.git
cd todo-list-backend
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Configure Environment Variables
Create a .env file in the root directory and add:

bash
Copy
Edit
REGION=us-east-1
COGNITO_USER_POOL_ID=your-user-pool-id
COGNITO_CLIENT_ID=your-client-id
COGNITO_CLIENT_SECRET=your-client-secret
RDS_HOST=your-rds-endpoint
RDS_USER=your-db-username
RDS_PASSWORD=your-db-password
RDS_DATABASE=ToDoTasks
PRIVATE_LAMBDA_ARN=arn:aws:lambda:us-east-1:your-account-id:function:private-lambda
4️⃣ Deploy Lambda Functions
bash
Copy
Edit
npm run deploy
🛠 API Endpoints
1️⃣ User Registration
Endpoint: POST /registration
Registers a new user in Cognito and stores user details in RDS via a private Lambda.

Request:

json
Copy
Edit
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "SecurePass123!"
}
Response:

json
Copy
Edit
{
  "message": "User Registration Successful! Check your email for verification code."
}
2️⃣ User Login
Endpoint: POST /login
Authenticates a user via Cognito and returns an access token.

Request:

json
Copy
Edit
{
  "username": "johndoe",
  "password": "SecurePass123!"
}
Response:

json
Copy
Edit
{
  "message": "Login Successful!",
  "idToken": "xxxx",
  "accessToken": "xxxx",
  "refreshToken": "xxxx"
}
3️⃣ Delete Account
Endpoint: DELETE /delete_account
Removes the user from Cognito and deletes tasks from RDS via a private Lambda.

Request:

json
Copy
Edit
{
  "username": "johndoe",
  "user_id": "123"
}
Response:

json
Copy
Edit
{
  "message": "User deleted successfully from Cognito & RDS!"
}
4️⃣ Create Task
Endpoint: POST /create_task
Creates a new task entry for the user in RDS.

Request:

json
Copy
Edit
{
  "user_id": "123",
  "task_name": "Complete AWS Setup",
  "task_date": "2025-02-09",
  "task_time": "14:00",
  "task_priority": "High"
}
Response:

json
Copy
Edit
{
  "message": "Task created successfully!",
  "task_id": "456"
}
5️⃣ Delete Task
Endpoint: DELETE /delete_task
Deletes a task from RDS.

Request:

json
Copy
Edit
{
  "user_id": "123",
  "task_id": "456"
}
Response:

json
Copy
Edit
{
  "message": "Task deleted successfully!"
}
6️⃣ Update Task
Endpoint: PUT /update_task
Updates a task’s details in RDS.

Request:

json
Copy
Edit
{
  "user_id": "123",
  "task_id": "456",
  "task_name": "Updated Task",
  "task_date": "2025-02-10",
  "task_time": "10:00",
  "task_priority": "Medium"
}

Response:
{
  "message": "Task updated successfully!"
}
7️⃣ Complete Task
Endpoint: PATCH /complete_task
Marks a task as completed in RDS.

Request:
{
  "user_id": "123",
  "task_id": "456"
}
Response:
{
  "message": "Task marked as completed!"
}
🔒 Security & Authentication
Cognito Authentication: Protects endpoints with JWT access tokens.
IAM Roles: Limits Lambda access to only required AWS services.
RDS Security Group: Restricts database access to private Lambda functions & EC2 only.
API Gateway Authorizers: Ensures that only authenticated users can access APIs.
🛠 Testing with Postman
1️⃣ Import the Postman Collection
2️⃣ Add Authorization Token (Cognito JWT)
3️⃣ Send requests to API Gateway endpoints

