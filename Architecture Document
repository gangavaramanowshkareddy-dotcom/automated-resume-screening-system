AUTOMATED RESUME SCREENING SYSTEM
ARCHITECTURE DOCUMENT



TABLE OF CONTENTS

1. Introduction
2. System Architecture Overview
3. Architecture Layers
4. Repository Architecture
5. Frontend Architecture
6. Backend Architecture
7. Authentication Architecture
8. Job Management Architecture
9. Resume Screening Architecture
10. n8n Workflow Architecture
11. AI / Ollama Architecture
12. JD-to-Resume Matching Architecture
13. Scoring Architecture
14. Screening Status and Polling Architecture
15. Database Architecture
16. Google Sheets Integration Architecture
17. Email Notification Architecture
18. API Communication Architecture
19. Security Architecture
20. Error Handling Architecture
21. Docker and Deployment Architecture
22. Environment Configuration Architecture
23. Complete End-to-End Architecture Flow
24. Current Technology Stack
25. Architecture Characteristics
26. Future Improvements
27. Conclusion


1. INTRODUCTION

The Automated Resume Screening System is a web-based AI-assisted application developed to automate the initial resume screening process.

The implemented system allows an HR user to:

- Log into the application securely
- Create and manage jobs
- Store Job Descriptions
- Upload multiple resumes
- Configure screening requirements and threshold
- Start a screening process
- Process resumes through an n8n workflow
- Extract candidate information
- Analyze candidate information using an Ollama-based LLM
- Compare candidates with the Job Description
- Generate a screening score
- Shortlist or reject candidates based on the configured threshold
- Store screening results
- Send shortlisted information to Google Sheets
- Send automated rejection emails
- View candidate results
- View dashboard information
- View analytics
- Cancel an active screening process
- Log out securely

The application is implemented as a combined frontend and backend repository with React-based frontend pages and a FastAPI backend.


2. SYSTEM ARCHITECTURE OVERVIEW

The implemented system follows a layered architecture.

The main architecture is:

                         HR USER
                            |
                            v
                 +---------------------+
                 |    React Frontend   |
                 +----------+----------+
                            |
                         REST API
                            |
                            v
                 +---------------------+
                 |   FastAPI Backend   |
                 +----+-----------+----+
                      |           |
                      |           |
                      v           v
              +-----------+   +-----------+
              | PostgreSQL|   |    n8n    |
              | Database  |   | Workflow  |
              +-----------+   +-----+-----+
                                    |
                      +-------------+-------------+
                      |             |             |
                      v             v             v
                Resume Process   Ollama      External
                                  / LLM       Services
                                    |             |
                                    |       +-----+------+
                                    |       |            |
                                    v       v            v
                              JD Matching Google      Email
                                         Sheets      Service
                                    |
                                    v
                               Scoring Logic
                                    |
                                    v
                             Screening Decision
                                    |
                         +----------+----------+
                         |                     |
                         v                     v
                    Shortlisted             Rejected
                         |                     |
                         v                     v
                  Google Sheets          Rejection Email
                         |
                         v
                  Screening Results
                         |
                         v
                   React Frontend


3. ARCHITECTURE LAYERS

The implemented application can be divided into the following layers.

3.1 Presentation Layer

Technology:

React

Responsibilities:

- Login
- Forgot Password
- Reset Password
- Dashboard
- Jobs
- Screening
- Candidates
- Analytics
- User interactions
- File upload
- Screening progress

3.2 Application Layer

Technology:

Python
FastAPI

Responsibilities:

- Authentication
- JWT handling
- Password verification
- Job APIs
- Resume handling
- Screening APIs
- Candidate result APIs
- Dashboard APIs
- Database operations
- n8n communication

3.3 Data Layer

Technology:

PostgreSQL

Responsibilities:

- Jobs
- Job-related information
- Resume information
- Screening records
- Candidate information
- Screening results
- Score and decision information

3.4 Workflow Layer

Technology:

n8n

Responsibilities:

- Screening workflow orchestration
- Resume processing
- File routing
- Text extraction
- Candidate information extraction
- LLM processing
- JD matching
- Scoring
- Decision branching
- Google Sheets
- Email notification

3.5 AI Layer

Technology:

Ollama / Local LLM

Responsibilities:

- Candidate information understanding
- Structured extraction
- Semantic analysis
- JD-to-resume matching
- Candidate summary generation

3.6 External Integration Layer

The implemented workflow integrates with:

- Google Sheets
- Email service


4. REPOSITORY ARCHITECTURE

The final repository is a combined application containing the frontend and backend components.

The main repository structure is:

automated-resume-screening-system/
|
+-- main.py
+-- auth.py
+-- database.py
+-- models.py
+-- schemas.py
+-- requirements.txt
+-- Dockerfile
+-- docker-compose.yml
+-- .env.example
+-- .gitignore
+-- package.json
+-- package-lock.json
+-- vite.config.js
+-- eslint.config.js
+-- index.html
|
+-- public/
|   +-- favicon.svg
|   +-- icons.svg
|
+-- src/
    +-- App.jsx
    +-- App.css
    +-- index.css
    +-- main.jsx
    |
    +-- api/
    |   +-- client.js
    |   +-- navigation.js
    |
    +-- components/
    |   +-- Layout.jsx
    |   +-- Sidebar.jsx
    |
    +-- pages/
        +-- Analytics.jsx
        +-- Candidates.jsx
        +-- Dashboard.jsx
        +-- Jobs.jsx
        +-- Screening.jsx

The project uses a single repository for the final application.


5. FRONTEND ARCHITECTURE

The frontend is implemented using React and Vite.

5.1 Main Frontend Entry

The application starts through the React application entry point and renders the main App component.

5.2 App Architecture

The main application component contains:

- Login functionality
- Forgot Password functionality
- Reset Password functionality
- Protected route handling
- Application routing
- Navigation handling

5.3 Frontend Pages

The implemented pages are:

Login
Dashboard
Jobs
Screening
Candidates
Analytics

5.4 Shared Components

Shared components include:

- Layout
- Sidebar

The Layout provides the common application structure for authenticated pages.

The Sidebar provides navigation between the main application sections.

5.5 API Client

The frontend uses a centralized API client.

The API client is responsible for communicating with the FastAPI backend and handling authenticated requests.

5.6 Navigation Architecture

Navigation is handled through React Router.

A navigation helper is used so that API-side authentication failures can redirect the user through the application's routing mechanism rather than directly changing the browser URL.

5.7 Protected Route Architecture

Protected pages are wrapped using a ProtectedRoute component.

The flow is:

User Requests Protected Page
          |
          v
   ProtectedRoute
          |
          v
Check Access Token
      /        \
     /          \
    v            v
Token Exists   No Token
    |             |
    v             v
Allow Access   Redirect to /
    
Protected routes include:

/dashboard
/jobs
/screening
/candidates
/analytics


6. BACKEND ARCHITECTURE

The backend is implemented using FastAPI.

The main backend application is contained in main.py.

Supporting backend files include:

- auth.py
- database.py
- models.py
- schemas.py

6.1 main.py

main.py contains the main FastAPI application and backend endpoints.

The backend handles:

- Application initialization
- CORS configuration
- Authentication routes
- Job routes
- Screening routes
- Candidate routes
- Dashboard routes
- Password reset functionality
- Database interaction
- Workflow communication

6.2 auth.py

auth.py contains authentication-related functionality.

It includes:

- JWT configuration
- Password hashing configuration
- Password verification
- Password hashing
- Authentication settings

6.3 database.py

database.py manages database connectivity and database session handling.

6.4 models.py

models.py contains the database model definitions used by the application.

6.5 schemas.py

schemas.py contains request/response validation schemas used by the FastAPI APIs.

7. AUTHENTICATION ARCHITECTURE

The implemented application uses JWT-based authentication.

7.1 Login Flow

User
 |
 v
Login Page
 |
 v
Login API
 |
 v
FastAPI
 |
 v
Verify Username
 |
 v
Verify Password Hash
 |
 v
Generate JWT Access Token
 |
 v
Return Access Token
 |
 v
React Frontend
 |
 v
Authenticated Application

7.2 Password Handling

The application uses bcrypt-based password hashing.

The password supplied by the user is verified against the configured password hash.

The authentication mechanism therefore does not rely on normal plain-text password comparison.

7.3 JWT Configuration

The JWT secret is loaded through environment configuration.

The application requires the JWT secret configuration to be present rather than silently using a default secret.

7.4 Access Token

The implemented access-token lifetime is configured for approximately 60 minutes.

7.5 Refresh Token

A refresh-token mechanism is implemented with a longer validity period of approximately 7 days.

7.6 Password Reset

The application includes:

- Forgot Password
- Reset Password

Password reset processing updates the configured password using secure password hashing.


8. JOB MANAGEMENT ARCHITECTURE

The Jobs module communicates with the FastAPI backend.

8.1 Job Flow

HR User
   |
   v
Jobs Page
   |
   v
React API Client
   |
   v
FastAPI Jobs API
   |
   v
PostgreSQL
   |
   v
Job Data Returned
   |
   v
Jobs Page

8.2 Implemented Job Operations

The Jobs module supports:

- Create Job
- View Jobs
- Edit Job
- Delete Job

8.3 Job-Candidate Association

Candidate information and screening results are associated with jobs.

This allows candidate data to be retrieved for the relevant recruitment position.


9. RESUME SCREENING ARCHITECTURE

Resume screening is the main processing pipeline of the application.

9.1 Screening Flow

HR selects a job
       |
       v
Configure Screening
       |
       v
Upload Resumes
       |
       v
Create Screening
       |
       v
FastAPI
       |
       v
n8n Workflow
       |
       v
Resume Processing
       |
       v
Candidate Extraction
       |
       v
AI Analysis
       |
       v
JD Matching
       |
       v
Scoring
       |
       v
Decision
       |
       +------------------+
       |                  |
       v                  v
Shortlisted            Rejected
       |                  |
       v                  v
Google Sheets          Email

9.2 Multiple Resume Processing

The screening interface supports uploading multiple resumes for a screening process.

The uploaded resumes are processed through the workflow.

9.3 Screening Context

Each screening run is associated with its selected job.

Candidate results are displayed according to the screening context being viewed.


10. N8N WORKFLOW ARCHITECTURE

n8n is used as the workflow orchestration engine.

The local workflow webhook used by the application is:

http://localhost:5678/webhook/resume-screening

10.1 Workflow Structure

Webhook
   |
   v
File Type Routing
   |
   v
Text Extraction / OCR
   |
   v
Edit / Structure Fields
   |
   v
Information Extractor
   |
   v
Ollama Chat Model
   |
   v
JD-to-Resume Matching
   |
   v
Structured Output
   |
   v
Scoring
   |
   v
IF Decision
   |
   +-----------------------+
   |                       |
   v                       v
Shortlisted             Rejected
   |                       |
   v                       v
Google Sheets           Send Email

10.2 Webhook

The webhook receives the screening request from the application.

10.3 File Type Routing

The workflow identifies the resume format and directs the input through the required processing path.

10.4 Text Extraction / OCR

Resume content is converted into readable text for the downstream AI processing steps.

10.5 Information Extractor

The Information Extractor converts resume information into structured candidate fields.

10.6 Ollama Chat Model

The Ollama model provides local LLM processing for candidate analysis and matching.

10.7 JD Matching

Candidate information is compared with the Job Description requirements.

10.8 Scoring

The workflow calculates the candidate's screening score.

10.9 IF Decision

The workflow checks the calculated score against the configured threshold.

10.10 Shortlisted Branch

Candidates satisfying the configured threshold are passed to the Google Sheets reporting stage.

10.11 Rejected Branch

Candidates below the configured threshold are passed to the email notification stage.


11. AI / OLLAMA ARCHITECTURE

The AI component is based on Ollama and the configured local LLM.

11.1 AI Flow

Resume Text
    |
    v
Information Extractor
    |
    v
Ollama / LLM
    |
    v
Structured Candidate Information
    |
    v
JD Matching
    |
    v
Structured Matching Information
    |
    v
Scoring

11.2 AI Responsibilities

The implemented workflow uses the LLM for:

- Understanding resume content
- Extracting candidate information
- Understanding technical skills
- Understanding experience
- Supporting semantic matching
- Generating candidate summaries

11.3 Local Model Architecture

The LLM is served locally through Ollama.

This allows the workflow to communicate with a locally running model instead of requiring the application frontend to directly call the model.


12. JD-TO-RESUME MATCHING ARCHITECTURE

The matching process compares candidate information with the selected Job Description.

12.1 Matching Inputs

The matching stage receives:

- Candidate information
- Job Description information
- Required skills
- Experience requirements
- Education requirements
- Project information
- Preferred skills
- JD alignment information

12.2 Matching Flow

Job Description
       |
       v
Structured JD Requirements
       |
       +
       |
       v
Candidate Structured Data
       |
       v
LLM-assisted Matching
       |
       v
Matching Criteria
       |
       v
Scoring Engine

12.3 Matching Output

The matching process produces structured information that is then passed to the scoring stage.


13. SCORING ARCHITECTURE

The scoring system uses weighted criteria.

The configured scoring structure used in the system is:

Required Skills          40%
Experience               20%
Education                15%
Projects                 15%
Preferred Skills           5%
JD Alignment               5%
------------------------------------------------
Total                    100%

The configured threshold for the documented screening configuration is:

70

13.1 Scoring Flow

Candidate Data
      |
      v
JD Matching
      |
      v
Criterion-Level Results
      |
      v
Weighted Scoring
      |
      v
Final Score
      |
      v
Threshold Check
      |
      +----------------------+
      |                      |
      v                      v
Score >= Threshold      Score < Threshold
      |                      |
      v                      v
Shortlisted               Rejected

13.2 Scoring Responsibility

The LLM provides semantic interpretation and matching information.

The scoring stage applies the configured weighted scoring logic to generate the final score.

This separates AI interpretation from the final numerical decision logic.


14. SCREENING STATUS AND POLLING ARCHITECTURE

The screening workflow can take time to complete because resume processing, LLM analysis, and external integrations are performed asynchronously through n8n.

14.1 Screening Status Flow

Screening Started
       |
       v
Processing
       |
       v
Frontend Requests Status
       |
       v
Backend Returns Current Status
       |
       v
Frontend Updates UI
       |
       +------------------+
       |                  |
       v                  v
Completed              Cancelled

14.2 Polling

The frontend periodically checks the screening status.

The implemented polling logic uses:

- 5-second polling interval
- Maximum of 360 attempts
- Approximately 30 minutes of maximum polling time

This replaces the earlier unnecessarily long polling duration.

14.3 Cancellation

The Screening page provides a cancellation mechanism.

The cancellation flow is:

User Clicks Cancel
       |
       v
Frontend Stops Polling
       |
       v
Cancel API Request
       |
       v
FastAPI
       |
       v
Screening Cancellation Handling

This allows the user to stop waiting for an active screening process.


15. DATABASE ARCHITECTURE

PostgreSQL is used as the primary database.

15.1 Logical Structure

Jobs
 |
 +---- Job Description
 |
 +---- Resumes
 |
 +---- Screening
          |
          +---- Candidates
          |
          +---- Screening Results

15.2 Database Responsibilities

PostgreSQL stores persistent application information used by the FastAPI backend.

The database is responsible for maintaining:

- Job records
- Resume-related records
- Screening records
- Candidate information
- Screening results
- Score information
- Decision information

15.3 Backend Database Communication

The React frontend never directly connects to PostgreSQL.

The communication path is:

React
  |
  v
FastAPI
  |
  v
Database Layer
  |
  v
PostgreSQL


16. GOOGLE SHEETS INTEGRATION ARCHITECTURE

Google Sheets is integrated through the n8n workflow.

16.1 Google Sheets Flow

Screening Result
       |
       v
Threshold Decision
       |
       v
Shortlisted Candidate
       |
       v
Google Sheets
       |
       v
Reporting Data

16.2 Data Recorded

The workflow can record candidate information such as:

- Candidate name
- Email
- Phone
- Skills
- Education
- Experience
- Score
- Screening summary
- Screening decision

16.3 Authentication

Google Sheets authentication is configured using the n8n Google integration.

Authentication credentials are not stored in the public source repository.


17. EMAIL NOTIFICATION ARCHITECTURE

Email notification is handled through the n8n workflow.

17.1 Email Flow

Candidate Screening
       |
       v
Score Generated
       |
       v
Threshold Check
       |
       v
Rejected
       |
       v
Candidate Email
       |
       v
Email Service
       |
       v
Rejection Notification

17.2 Email Responsibility

n8n handles the notification workflow.

The backend and screening workflow provide the candidate and screening information required for the notification.


18. API COMMUNICATION ARCHITECTURE

The frontend and backend communicate through REST APIs.

18.1 Authentication

Frontend
   |
   v
POST Login
   |
   v
FastAPI
   |
   v
JWT Token
   |
   v
Frontend

18.2 Jobs

Frontend
   |
   +---- GET /api/jobs
   |
   +---- POST /api/jobs
   |
   +---- PUT /api/jobs/{id}
   |
   +---- DELETE /api/jobs/{id}
   |
   v
FastAPI
   |
   v
PostgreSQL

18.3 Candidates

Frontend
   |
   v
GET /api/jobs/{id}/candidates
   |
   v
FastAPI
   |
   v
PostgreSQL
   |
   v
Candidate Results

18.4 Dashboard

Frontend
   |
   v
GET /api/dashboard/overview
   |
   v
FastAPI
   |
   v
Dashboard Data

18.5 Screening

Frontend
   |
   v
Screening API
   |
   v
FastAPI
   |
   +---- PostgreSQL
   |
   +---- n8n


19. SECURITY ARCHITECTURE

The implemented application includes security controls across the frontend and backend.

19.1 Authentication

JWT-based authentication protects application access.

19.2 Password Security

Bcrypt is used for password hashing and password verification.

19.3 Protected Frontend Routes

Protected routes require an access token.

19.4 Protected API Communication

Authenticated requests carry the required authentication information to backend APIs.

19.5 Environment-Based Secrets

Sensitive configuration is loaded from environment variables.

Important configuration includes:

JWT_SECRET
HR_USERNAME
HR_PASSWORD
DATABASE_URL
N8N_WEBHOOK_URL
N8N_API_KEY
SMTP_EMAIL
SMTP_APP_PASSWORD
HR_EMAIL
CORS_ORIGINS
VITE_API_BASE_URL

19.6 CORS

CORS configuration is environment-based.

The backend does not depend on one permanently hardcoded localhost origin.

19.7 Repository Protection

The .env file is excluded from Git tracking.

The repository provides .env.example as a template.

Sensitive values such as passwords, JWT secrets, database credentials, API keys, and mail credentials are not intended to be stored in the public repository.

19.8 Resume Protection

Uploaded resume files are excluded from source control through the repository ignore configuration.


20. ERROR HANDLING ARCHITECTURE

Error handling is implemented across frontend, backend, and workflow stages.

20.1 Frontend Errors

Frontend errors can occur during:

- Authentication
- Job operations
- File upload
- Screening requests
- Candidate retrieval
- Dashboard retrieval
- Analytics retrieval

The frontend displays status information based on the API response.

20.2 Backend Errors

Backend errors can occur during:

- Authentication
- Database operations
- Job operations
- Resume processing
- Screening operations
- Workflow communication

FastAPI returns appropriate API responses for failures.

20.3 Workflow Errors

Possible workflow failures include:

- Invalid resume
- Text extraction failure
- OCR failure
- LLM failure
- Invalid structured output
- Matching failure
- Google Sheets failure
- Email failure

20.4 Screening Error Handling

Screening status is used to represent the state of a long-running process.

The frontend checks the current status instead of assuming that a screening has immediately completed.


21. DOCKER AND DEPLOYMENT ARCHITECTURE

The backend supports Docker-based deployment.

21.1 Backend Docker Architecture

Docker
   |
   v
Python 3.11 Base Image
   |
   v
Install requirements
   |
   v
Copy Application
   |
   v
Uvicorn
   |
   v
FastAPI
   |
   v
Port 8000

21.2 Dockerfile

The backend Dockerfile:

- Uses Python 3.11
- Sets the application working directory
- Installs requirements.txt
- Copies application files
- Exposes port 8000
- Runs Uvicorn

21.3 Docker Compose

The project includes docker-compose.yml for backend container configuration.

The backend uses the .env file for environment configuration.

21.4 Frontend

The React frontend is developed using Vite and can be run separately from the backend.


22. ENVIRONMENT CONFIGURATION ARCHITECTURE

The project provides an .env.example file.

The configuration includes:

CORS_ORIGINS
DATABASE_URL
N8N_WEBHOOK_URL
JWT_SECRET
HR_USERNAME
HR_PASSWORD
N8N_API_KEY
FRONTEND_URL
SMTP_EMAIL
SMTP_APP_PASSWORD
HR_EMAIL
VITE_API_BASE_URL

The actual .env file contains environment-specific values and is excluded from Git tracking.

This separation allows the same source code to be configured for different environments without changing the application code.


23. COMPLETE END-TO-END ARCHITECTURE FLOW

The complete implemented flow is:

                         HR USER
                            |
                            v
                     React Frontend
                            |
                            v
                          Login
                            |
                            v
                    JWT Authentication
                            |
                            v
                       Dashboard
                            |
                            v
                       Jobs Page
                            |
                            v
                    Select / Create Job
                            |
                            v
                     Screening Page
                            |
                            v
                   Upload Multiple Resumes
                            |
                            v
                     Create Screening
                            |
                            v
                    FastAPI Backend
                            |
                            v
                    Screening Record
                            |
                            v
                     n8n Webhook
                            |
                            v
                   File Type Detection
                            |
                            v
                Text Extraction / OCR
                            |
                            v
                  Information Extractor
                            |
                            v
                     Ollama / LLM
                            |
                            v
               Structured Candidate Data
                            |
                            v
                   JD-to-Resume Matching
                            |
                            v
                    Scoring Process
                            |
                            v
                    Threshold Decision
                       /          \
                      /            \
                     v              v
             Shortlisted          Rejected
                  |                  |
                  v                  v
           Google Sheets         Email Service
                  |                  |
                  v                  v
          Screening Results    Rejection Email
                  |
                  v
             FastAPI Backend
                  |
          +-------+--------+
          |                |
          v                v
     Candidates         Analytics
          |
          v
       Dashboard


24. CURRENT TECHNOLOGY STACK

Frontend:
- React
- Vite
- React Router
- JavaScript
- CSS

Backend:
- Python
- FastAPI
- Uvicorn

Database:
- PostgreSQL
- SQLAlchemy

Authentication:
- JWT
- Bcrypt

Workflow:
- n8n

AI:
- Ollama
- Local LLM

External Integrations:
- Google Sheets
- Email Service

Deployment:
- Docker
- Docker Compose

Version Control:
- Git
- GitHub


25. ARCHITECTURE CHARACTERISTICS

The implemented architecture has the following characteristics.

25.1 Modular

Frontend, backend, database, workflow, and AI processing are separated.

25.2 API Driven

The frontend communicates with the backend through REST APIs.

25.3 Workflow Oriented

The long-running screening process is orchestrated through n8n.

25.4 AI Assisted

The LLM is used to extract, understand, and match candidate information.

25.5 Database Backed

Application and screening-related information is persisted in PostgreSQL.

25.6 Configurable

Important environment-specific configuration is handled through environment variables.

25.7 Secure

Authentication, password hashing, route protection, CORS configuration, and environment-based secret management are implemented.

25.8 Extensible

Individual components can be extended without redesigning the entire application.




 CONCLUSION

The Automated Resume Screening System implements a layered architecture combining a React frontend, FastAPI backend, PostgreSQL database, n8n workflow automation, Ollama-based LLM processing, Google Sheets integration, and automated email notification.

The React frontend provides the HR user interface.

The FastAPI backend manages authentication, jobs, resumes, screening operations, candidates, dashboard information, and communication with the workflow.

PostgreSQL provides persistent application storage.

n8n orchestrates the resume screening pipeline.

Ollama provides local LLM-based processing for candidate information extraction and JD-to-resume matching.

The scoring layer applies configured weighted criteria and the threshold determines whether a candidate follows the shortlisted or rejected branch.

Shortlisted candidate information is transferred to Google Sheets, while rejected candidates are handled through automated email notifications.

The architecture also includes protected frontend routes, JWT authentication, bcrypt password handling, configurable CORS, environment-based secret management, bounded screening polling, cancellation support, Docker configuration, and a combined frontend/backend repository structure.

The resulting architecture provides a structured implementation for automated initial resume screening while maintaining clear separation between the user interface, application services, data storage, workflow automation, AI processing, and external integrations.
