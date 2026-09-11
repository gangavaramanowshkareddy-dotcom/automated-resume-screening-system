Architecture Document

 Automated Resume Screening System

1. Overview

The Automated Resume Screening System is an AI-powered recruitment application that helps HR teams screen multiple resumes against a Job Description (JD).

The system accepts a Job Description and multiple resumes, extracts candidate information, compares candidates with the JD, generates a matching score, and makes a screening decision.

Candidates meeting the required score are shortlisted and their details are recorded in Google Sheets. Candidates below the threshold are rejected and receive an automated rejection email.

 2. High-Level Architecture

The system consists of the following major components:

- React Frontend
- FastAPI Backend
- PostgreSQL Database
- File Storage
- n8n Workflow Automation
- Resume Processing
- LLM / Ollama
- Scoring Engine
- Google Sheets
- Email Service

Architecture Flow

                                  HR User
                                     ↓
                               React Frontend
                                     ↓
                             FastAPI Backend
                                    ↓
                          PostgreSQL + File Storage
                                     ↓
                                n8n Workflow
                                      ↓
                              Resume Processing
                                      ↓
                        Candidate Information Extraction
                                      ↓
                              JD-to-Resume Matching
                                      ↓
                                 Scoring Engine
                                      ↓
                                    Decision
                                  ↙        ↘
                      Shortlisted             Rejected
                          ↓                       ↓
                 Google Sheets                   Rejection Email

3. Frontend Architecture

The frontend is developed using React.

The frontend allows HR users to:

- Login
- Create Job Descriptions
- Enter required skills and experience
- Upload multiple resumes
- Start the screening process
- View screening progress
- View candidate results
- View candidate scores and summaries
- View analytics
- View stored jobs

 Main Frontend Modules

- Login
- Dashboard
- Jobs
- Job Description
- Resume Upload
- Screening
- Results
- Analytics

The frontend communicates with the FastAPI backend through REST APIs.

4. Backend Architecture

The backend is developed using Python and FastAPI.

The backend handles:

- User authentication
- Job creation
- Job Description management
- Resume upload
- Resume management
- Screening requests
- Communication with n8n
- Candidate result retrieval
- Database operations
- API validation
- Error handling

                  Backend Flow

                 React Frontend
                       ↓
                  FastAPI APIs
                       ↓
                  Authentication
                   Job Management
                  Resume Management
                      Screening
                        Results
                           ↓
                        PostgreSQL

 5. Database Architecture

PostgreSQL is used as the primary application database.

The database stores:

- User information
- Job information
- Job Descriptions
- Uploaded resume information
- Screening jobs
- Candidate information
- Screening results
- Matching scores
- Screening decisions


 6. Resume Processing Architecture

When HR uploads resumes, the files are processed through the n8n workflow.

 Processing Flow

                                                Resume Upload
                                                       ↓
                                              File Type Detection
                                                      ↓
                                                Text Extraction
                                                      ↓
                                         Candidate Information Extraction
                                                       ↓
                                              Structured Candidate Data

The system extracts information such as:

- Name
- Email
- Phone Number
- Skills
- Education
- Experience
- Projects
- Other relevant resume information

 7. LLM Architecture

The system uses Ollama and a local LLM for AI-based resume analysis.

The LLM helps to:

- Understand resume information
- Structure candidate information
- Analyze candidate skills and experience
- Compare candidate information with the Job Description
- Generate candidate summaries
- Support JD-to-resume matching

 LLM Flow

                                                 Resume Text
                                                      ↓
                                             Information Extraction
                                                       ↓
                                                  Ollama / LLM
                                                        ↓
                                        Structured Candidate Information
                                                         ↓
                                                    JD Matching

Structured output is used so that candidate information can be passed consistently to the scoring process.

 8. JD-to-Resume Matching

The system compares candidate information against the Job Description.

The matching process considers:

- Required Skills
- Experience
- Education
- Projects
- Preferred Skills
- Overall JD Alignment

The matching result is converted into a numerical score.

 9. Scoring Architecture

The scoring engine uses a weighted evaluation approach.
HR can change weights and threshold as his/her wish

| Category | Weight |
|---|---:|
| Required Skills | 40 |
| Experience | 20 |
| Education | 15 |
| Projects | 15 |
| Preferred Skills | 5 |
| JD Alignment | 5 |
| Total | 100 |

The configured screening threshold is 70.

 Decision Flow

                                                  Candidate Profile
                                                          ↓
                                                      JD Matching
                                                           ↓
                                                       Weighted Scoring
                                                            ↓
                                                      Matching Score
                                                            ↓
                                                           Decision

                                         Score >= 70                         Score < 70
                                                                                  ↓
                                               ↓
                                        Shortlisted                            Rejected
                                             ↓                                      ↓
                                        Google Sheets                           Rejection Email
                                         

 10. n8n Workflow Architecture

n8n is used as the workflow automation layer.

Main Workflow
                                              Webhook
                                                ↓
                                         File Type Routing
                                                ↓
                                        Text Extraction / OCR
                                                ↓
                                        Edit / Structure Fields
                                                 ↓
                                          Information Extractor
                                                 ↓
                                           Ollama Chat Model
                                                  ↓
                                         JD-to-Resume Matching
                                                  ↓
                                              Structured Output
                                                  ↓
                                                Scoring Engine
                                                    ↓
                                              IF Decision
                                                  ↓
                                          ├── Score ≥ 70
                                          │      ↓
                                          │   Shortlisted
                                          │      ↓
                                          │   Google Sheets
                                          │
                                          └── Score < 70
                                                   ↓
                                               Rejected
                                                  ↓
                                         Send Rejection Email

 Workflow Responsibilities

 Webhook

Receives the resume processing request.

File Type Routing

Identifies the uploaded resume format and directs it to the appropriate processing path.

 Text Extraction 

Extracts readable content from supported resume files.

 Information Extractor

Extracts structured candidate information.

 Ollama Chat Model

Processes candidate information using the configured local LLM.

 JD Matching

Compares candidate information with the Job Description.

Scoring

Generates the candidate matching score.

 IF Decision

Checks whether the candidate meets the configured threshold.

 Google Sheets

Stores shortlisted candidate details and screening results.

 Send Email

Sends an automated rejection email to candidates who do not meet the threshold.

 11. Google Sheets Architecture

Google Sheets is used to record shortlisted candidate information and screening results.

The stored information can include:

- Candidate Name
- Email
- Phone
- Skills
- Education
- Experience
- Matching Score
- Screening Summary
- Screening Decision

12. Email Notification Architecture

The email service is used to automatically notify rejected candidates.

Screening Decision
↓
Score < 70
↓
Rejected
↓
Rejection Email

 13. Complete System Data Flow

1. HR logs into the application.
2. HR creates or enters the Job Description.
3. HR uploads multiple resumes.
4. FastAPI receives the screening request.
5. Resumes are processed through n8n.
6. Resume text is extracted.
7. Candidate information is extracted.
8. The LLM analyzes candidate information.
9. Candidate information is compared with the Job Description.
10. A matching score is generated.
11. A screening decision is made.

If the score is 70 or above:

Candidate
↓
Shortlisted
↓
Google Sheets

If the score is below 70:

Candidate
↓
Rejected
↓
Rejection Email

 14. Security Architecture

The application includes authentication and authorization for HR users.

Security considerations include:

- JWT-based authentication
- Protected backend APIs
- Role-based access control
- Secure password handling
- Environment variables for sensitive configuration
- Protection of uploaded resume files
- Controlled access to candidate information
- Secure external service credentials

Passwords, API keys, database credentials, and authentication secrets should not be stored directly in source code.

15. Error Handling

The system handles failures that may occur during:

- Resume upload
- File processing
- Text extraction
- OCR
- LLM processing
- Structured output generation
- Database operations
- Google Sheets operations
- Email delivery

Errors should be handled without unnecessarily stopping the processing of other candidates.

 16. Scalability

The system separates the frontend, backend, database, and workflow automation layers.

Possible future scalability improvements include:

- Asynchronous processing
- Batch processing
- Queue-based processing
- Worker-based processing
- Dedicated LLM infrastructure
- Cloud file storage
- Database optimization
- Monitoring and logging
- Containerized deployment

17. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| Workflow Automation | n8n |
| LLM | Ollama / Local LLM |
| Resume Processing | Python and n8n |
| Reporting | Google Sheets |
| Email Notification | Email Service |
| Version Control | Git, GitHub |

 18. Architecture Summary

The Automated Resume Screening System follows a modular architecture where React provides the HR interface, FastAPI manages backend operations, PostgreSQL provides application storage, and n8n manages the automated screening workflow.

The system extracts candidate information from resumes, uses an LLM for intelligent analysis and JD matching, and applies a weighted scoring mechanism to make the screening decision.

Candidates meeting the configured threshold are shortlisted and recorded in Google Sheets. Candidates below the threshold are rejected and receive an automated rejection email.

This architecture provides a structured foundation for efficient and automated resume screening.
