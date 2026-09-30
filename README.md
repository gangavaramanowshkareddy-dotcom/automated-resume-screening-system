
Automated Resume Screening System

An AI-assisted resume screening platform that automates the initial stages of candidate evaluation by processing Job Descriptions and resumes, extracting candidate information, matching candidates against job requirements, generating screening scores, and automating candidate communication and reporting.

 Overview

The Automated Resume Screening System is designed for HR and recruitment workflows where multiple candidate resumes need to be evaluated against a Job Description.

The system combines a React frontend, FastAPI backend, PostgreSQL database, n8n workflow automation, and a local LLM served through Ollama.

The platform automates repetitive screening activities while allowing HR users to configure the screening threshold and review the generated candidate results.

 Key Features

- Secure HR login
- JWT-based authentication
- Protected application routes
- Password reset functionality
- Job creation and job management
- Job Description configuration
- Multiple resume upload
- Resume file validation and processing
- Resume information extraction
- Candidate information structuring
- JD-to-resume matching
- AI-assisted candidate analysis
- Candidate screening score generation
- Configurable screening threshold
- Automated shortlist processing
- Automated rejection emails
- Google Sheets reporting
- Candidate results and summaries
- Dashboard statistics
- Candidate analytics
- Screening cancellation
- PostgreSQL data persistence
- Docker support

 System Architecture


                         HR / RECRUITER
                               |
                               v
                       React Frontend
                               |
                               v
                        FastAPI Backend
                         /           \
                        /             \
                       v               v
                PostgreSQL        n8n Workflow
                                      |
                       +--------------+--------------+
                       |              |              |
                       v              v              v
                Resume Processing  Ollama / LLM  Email Service
                       |              |
                       v              v
                Candidate Data     JD Matching
                                      |
                                      v
                               Scoring Engine
                                      |
                           +----------+----------+
                           |                     |
                           v                     v
                      Shortlisted             Rejected
                           |                     |
                           v                     v
                    Google Sheets        Rejection Email


 End-to-End Workflow


HR Login
   |
   v
Create / Select Job
   |
   v
Enter Job Description
   |
   v
Upload Multiple Resumes
   |
   v
FastAPI Backend
   |
   v
Create Screening Job
   |
   v
n8n Workflow
   |
   v
Resume Processing
   |
   v
Text / Content Extraction
   |
   v
Candidate Information Extraction
   |
   v
Ollama / Local LLM
   |
   v
JD-to-Resume Matching
   |
   v
Screening Score
   |
   v
Threshold Check
   |
   +----------------------+
   |                      |
   v                      v
Score >= Threshold    Score < Threshold
   |                      |
   v                      v
Shortlisted            Rejected
   |                      |
   v                      v
Google Sheets        Rejection Email
   |
   v
Dashboard / Candidates / Analytics


 Technology Stack

| Layer               | Technology           |
| ------------------- | -------------------- |
| Frontend            | React.js, Vite       |
| Backend             | Python, FastAPI      |
| Database            | PostgreSQL           |
| Workflow Automation | n8n                  |
| AI / LLM            | Ollama / Local LLM   |
| Authentication      | JWT                  |
| Password Security   | bcrypt               |
| API Communication   | REST APIs            |
| Reporting           | Google Sheets        |
| Email               | SMTP / Email Service |
| Containerization    | Docker               |
| Version Control     | Git, GitHub          |

 Application Modules

 Authentication

The application provides HR authentication using JWT-based access control.

The authentication flow includes:

* Login
* Protected application routes
* Access token handling
* Refresh token handling
* Password reset
* Secure password hashing using bcrypt

 Jobs

The Jobs module allows HR users to:

* Create jobs
* Configure job information
* Store Job Descriptions
* View existing jobs
* Edit jobs
* Delete jobs
* View candidate counts associated with jobs

Screening

The Screening module allows HR users to:

* Select a job
* Upload a Job Description
* Upload multiple resumes
* Configure the screening threshold
* Start resume screening
* View screening progress
* Cancel an active screening process
* View screening results

 Candidates

The Candidates module displays screening results for the selected screening/job context, including candidate information, scores, summaries, and screening status.

 Dashboard

The Dashboard provides application-level screening information such as:

* Total jobs
* Total candidates
* Total screenings
* Average screening score
* Resumes uploaded
* Resumes screened
* Shortlisted candidates
* Rejected candidates

 Analytics

The Analytics module provides visual and numerical information related to screening results and candidate outcomes.

 Resume Screening Process

The system processes resumes through the following stages:

1. Resume upload
2. File validation
3. Resume content extraction
4. Candidate information extraction
5. Structured candidate data generation
6. Job Description analysis
7. JD-to-resume comparison
8. Screening score generation
9. Threshold evaluation
10. Shortlist or rejection decision
11. Reporting and candidate communication

 AI / LLM Layer

The system uses Ollama to provide a local LLM environment for AI-assisted resume analysis.

The LLM layer is used for tasks such as:

* Understanding resume content
* Structuring candidate information
* Analyzing candidate skills and experience
* Comparing candidate information with the Job Description
* Supporting JD-to-resume matching
* Generating candidate summaries

The structured output from the AI processing is passed into the screening/scoring workflow.

Screening Decision

The screening process uses a configurable threshold.


Candidate Resume
      |
      v
Candidate Analysis
      |
      v
JD Matching
      |
      v
Screening Score
      |
      +----------------------+
      |                      |
      v                      v
 >= Configured Threshold   < Threshold
      |                      |
      v                      v
 Shortlisted               Rejected
      |                      |
      v                      v
Google Sheets          Rejection Email


n8n Workflow

n8n is used as the workflow automation layer.

The workflow coordinates:

* Resume intake
* Resume processing
* Candidate information extraction
* LLM processing
* Job Description matching
* Screening score generation
* Decision routing
* Google Sheets reporting
* Email notifications





 n8n Local Webhook


http://localhost:5678/webhook/resume-screening


The webhook is used by the application to trigger the resume screening workflow in the local development environment.

 Google Sheets Integration

Google Sheets is used as the reporting/output layer for shortlisted screening results.

The workflow can store information such as:

* Candidate name
* Candidate email
* Phone number
* Skills
* Education
* Experience
* Screening score
* Screening summary
* Screening decision

Google Sheets is connected through the n8n workflow using OAuth authentication.

 Email Notification

Candidates who fall below the configured screening threshold can receive an automated rejection email through the configured email service.

This removes the need for HR to manually send individual rejection notifications after screening.

 Backend Architecture

The FastAPI backend provides REST APIs for:

* Authentication
* Password reset
* Job management
* Resume management
* Screening creation
* Screening status
* Screening cancellation
* Candidate results
* Dashboard data
* Analytics data
* External workflow integration

The backend uses PostgreSQL for persistent application and screening data.

 Database

PostgreSQL is used as the application's primary persistent database.

The database stores information related to:

* Jobs
* Job Descriptions
* Candidates
* Resumes
* Screening jobs
* Screening scores
* Screening decisions
* Application data

 Security

Security-related implementation includes:

* JWT-based authentication
* Protected frontend routes
* Backend authorization
* bcrypt password hashing
* Environment variables for sensitive configuration
* Configurable CORS
* Secure credential handling
* `.env` excluded from Git
* Candidate data access control

Sensitive configuration values such as passwords, tokens, API keys, database credentials, and service credentials should be stored in environment variables and must not be committed to the repository.

 Project Structure


automated-resume-screening-system/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── api/
│   │   ├── client.js
│   │   └── navigation.js
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── Layout.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Analytics.jsx
│   │   ├── Candidates.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Jobs.jsx
│   │   └── Screening.jsx
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── auth.py
├── database.py
├── main.py
├── models.py
├── schemas.py
├── requirements.txt
├── package.json
├── package-lock.json
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── .gitignore
└── README.md


 Environment Configuration

Create a local `.env` file using `.env.example`.

Example configuration:


CORS_ORIGINS=http://localhost:5173
DATABASE_URL=
N8N_WEBHOOK_URL=
JWT_SECRET=
HR_USERNAME=
HR_PASSWORD=
N8N_API_KEY=
FRONTEND_URL=
SMTP_EMAIL=
SMTP_APP_PASSWORD=
HR_EMAIL=
VITE_API_BASE_URL=http://127.0.0.1:8000




 Backend Setup

 Prerequisites

* Python 3.11+
* Node.js
* PostgreSQL
* n8n
* Ollama
* Git

 Create Python Virtual Environment
python -m venv venv

 Windows
venv\Scripts\activate


Install Backend Dependencies
pip install -r requirements.txt


Start FastAPI
uvicorn main:app --reload --host 127.0.0.1 --port 8000


Backend:
http://127.0.0.1:8000

 Frontend Setup

Install dependencies:
npm install


Start the development server:
npm run dev


Frontend:
http://localhost:5173


n8n Setup

Start n8n:
n8n


Open:
http://localhost:5678


Activate the workflow:
Automated Resume Screening


Docker

The project includes:

* `Dockerfile`
* `docker-compose.yml`

These files provide containerization support for the backend environment.

Error Handling

The system handles failures that may occur during different stages of processing, including:

* Invalid resume files
* Resume extraction failures
* AI/LLM processing failures
* Invalid structured output
* Database errors
* n8n workflow errors
* Google Sheets integration errors
* Email delivery failures
* Screening cancellation

The workflow is designed so that processing failures can be handled without unnecessarily stopping unrelated screening operations.

Scalability

The application separates major responsibilities across:

* Frontend
* Backend
* Database
* Workflow automation
* LLM processing
* Reporting
* Email notification

This separation allows individual components to be improved or scaled independently as system requirements increase.

Documentation

The repository is supported by the following project documentation:

* **Automated Resume Screening System – Design Document**
* **Automated Resume Screening System – Architecture Document**

These documents describe the system requirements, design, architecture, workflow, integrations, security considerations, and deployment considerations.

 Project Status

The application has been tested through the main resume screening workflow, including:

* Login
* Protected routes
* Job management
* Job Description upload
* Resume upload
* n8n workflow processing
* Resume information extraction
* JD-to-resume matching
* Candidate scoring
* Screening decisions
* Rejection email
* Google Sheets reporting
* Candidates/results
* Dashboard
* Analytics
* Logout
* Password reset

Repository
https://github.com/gangavaramanowshkareddy-dotcom/automated-resume-screening-system


 Author
Anowshka Reddy


 
