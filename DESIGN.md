AUTOMATED RESUME SCREENING SYSTEM
SYSTEM DESIGN DOCUMENT

TABLE OF CONTENTS

1. Introduction
2. System Overview
3. System Objectives
4. System Scope
5. High-Level Architecture
6. System Components
7. Frontend Design
8. Backend Design
9. Database Design
10. Resume Processing Design
11. Job Description Processing Design
12. LLM and AI Processing Design
13. JD-to-Resume Matching Design
14. Scoring and Decision Design
15. n8n Workflow Design
16. Google Sheets Integration
17. Email Notification Design
18. Authentication and Security Design
19. API Design
20. End-to-End Data Flow
21. Error Handling and Logging
22. Deployment Architecture
23. Scalability Design
24. Non-Functional Requirements
25. Limitations
26. Future Enhancements
27. Conclusion


1. INTRODUCTION

The Automated Resume Screening System is an AI-assisted recruitment support application designed to automate the initial stage of resume screening.

The system allows HR users to create and manage job descriptions, upload candidate resumes, start screening processes, monitor screening progress, and review candidate results through a web-based interface.

The system combines a React frontend, FastAPI backend, PostgreSQL database, n8n workflow automation, and an Ollama-based local Large Language Model (LLM) processing layer.

The main purpose of the system is to reduce repetitive manual effort during initial resume screening while maintaining a structured and consistent evaluation process.


2. SYSTEM OVERVIEW

The system follows a layered architecture in which each major responsibility is handled by a dedicated component.

The main layers are:

1. Presentation Layer
   - React frontend
   - HR user interface
   - Dashboard
   - Jobs
   - Screening
   - Candidates
   - Analytics

2. Application Layer
   - FastAPI backend
   - Authentication
   - Job management
   - Resume management
   - Screening management
   - Candidate result retrieval

3. Workflow Orchestration Layer
   - n8n
   - Resume processing workflow
   - Information extraction
   - JD matching
   - Scoring
   - Decision routing
   - Google Sheets integration
   - Email notification

4. Data Layer
   - PostgreSQL
   - Resume metadata
   - Job information
   - Screening information
   - Candidate information
   - Screening results

5. AI Layer
   - Ollama
   - Local LLM
   - Resume information extraction
   - Candidate understanding
   - JD-to-resume semantic matching
   - Candidate summary generation


3. SYSTEM OBJECTIVES

The primary objectives of the system are:

1. Reduce manual effort involved in initial resume screening.
2. Process multiple resumes through an automated workflow.
3. Extract structured candidate information from unstructured resumes.
4. Compare candidate information with Job Description requirements.
5. Generate a transparent matching score using weighted criteria.
6. Apply a configurable screening threshold.
7. Store screening results for later retrieval.
8. Record shortlisted candidates in Google Sheets.
9. Automatically send rejection emails to candidates below the threshold.
10. Provide HR with dashboards, candidate results, and analytics.
11. Maintain secure handling of authentication credentials and candidate information.


4. SYSTEM SCOPE

4.1 In Scope

The system includes:

- HR authentication
- Protected application routes
- Job creation and management
- Job Description storage
- Resume upload
- Multiple resume processing
- Resume text extraction
- Structured candidate information extraction
- LLM-based candidate analysis
- JD processing
- JD-to-resume matching
- Weighted scoring
- Configurable screening threshold
- Screening decision
- Candidate result storage
- Candidate result display
- Dashboard
- Analytics
- Google Sheets reporting
- Automated rejection emails
- Error handling
- API-based frontend/backend communication

4.2 Out of Scope

The system does not replace the complete recruitment lifecycle.

The following are outside the primary scope of the system:

- Interview scheduling
- Payroll processing
- Employee onboarding
- Offer negotiation
- Complete Applicant Tracking System replacement
- Final HR hiring decisions
- Advanced multilingual resume processing
- Complete recruitment lifecycle automation


5. HIGH-LEVEL ARCHITECTURE

The high-level architecture of the system is:

HR / RECRUITER
       |
       v
+----------------------+
|    React Frontend    |
+----------+-----------+
           |
           | REST API
           v
+----------------------+
|    FastAPI Backend   |
+-----+-----------+----+
      |           |
      |           |
      v           v
+-----------+   +----------------+
|PostgreSQL |   | n8n Workflow   |
| Database  |   | Automation     |
+-----------+   +-------+--------+
                        |
                        +------------------+
                        |                  |
                        v                  v
                +---------------+   +-------------+
                | Ollama / LLM  |   | External    |
                | AI Processing |   | Services    |
                +---------------+   +-------------+
                                         |
                              +----------+----------+
                              |                     |
                              v                     v
                       Google Sheets         Email Service


6. SYSTEM COMPONENTS

6.1 React Frontend

The React frontend is the user-facing layer of the application.

Main responsibilities include:

- HR login
- Dashboard display
- Job management
- Job Description handling
- Resume upload
- Screening initiation
- Screening progress display
- Candidate result display
- Analytics
- Logout

6.2 FastAPI Backend

The FastAPI backend provides REST APIs between the frontend, database, and workflow system.

Responsibilities include:

- Authentication
- JWT token management
- Password handling
- Job management
- Resume upload handling
- Screening creation
- Screening status management
- Candidate retrieval
- Dashboard data
- Analytics data
- Database operations
- n8n communication
- API validation
- Error handling

6.3 PostgreSQL

PostgreSQL acts as the primary persistent database.

It stores:

- Job information
- Job Descriptions
- Resume metadata
- Screening records
- Candidate information
- Screening results
- Scores
- Screening decisions
- Related application information

6.4 n8n

n8n functions as the workflow orchestration layer.

It manages the long-running screening pipeline and connects the application with resume-processing, AI, reporting, and notification services.

6.5 Ollama / Local LLM

Ollama provides the local LLM execution layer.

The LLM is used for:

- Understanding extracted resume content
- Structuring candidate information
- Interpreting candidate experience
- Semantic matching against JD requirements
- Producing candidate summaries

6.6 Google Sheets

Google Sheets provides reporting output for shortlisted candidates and screening information.

6.7 Email Service

The email service sends automated rejection notifications to candidates who fall below the configured threshold.


7. FRONTEND DESIGN

The frontend is developed using React.

7.1 Frontend Modules

The application contains the following major pages:

Login
Dashboard
Jobs
Screening
Candidates
Analytics

Authentication-related functionality also includes:

- Forgot Password
- Reset Password

7.2 Login

The login interface allows authorized HR users to authenticate.

Upon successful authentication, an access token is stored and used for protected application requests.

7.3 Protected Routes

Application routes are protected using authentication state.

Protected pages include:

- /dashboard
- /jobs
- /screening
- /candidates
- /analytics

Unauthenticated users are redirected to the login page.

7.4 Dashboard

The dashboard provides an overview of screening activity.

It displays information such as:

- Total Jobs
- Total Candidates
- Screening Count
- Average Score
- Resumes Uploaded
- Resumes Screened
- Shortlisted Candidates
- Rejected Candidates

Dashboard information is obtained from backend APIs.

7.5 Jobs Module

The Jobs page allows HR users to:

- Create jobs
- View jobs
- Edit jobs
- Delete jobs
- View candidate information associated with jobs

Job information is maintained through backend APIs and PostgreSQL rather than relying only on browser-side storage.

7.6 Screening Module

The Screening page allows HR users to:

- Select a job
- Upload a Job Description when required
- Upload multiple resumes
- Configure screening criteria
- Start screening
- View screening progress
- Cancel an active screening process

7.7 Candidates Module

The Candidates page displays processed candidate information, including:

- Candidate name
- Email
- Phone number
- Skills
- Education
- Experience
- Projects
- Score
- Decision
- Screening summary

Results are associated with the relevant screening/job context.

7.8 Analytics Module

The Analytics page provides visual and numerical information related to screening results.

Possible metrics include:

- Candidate distribution
- Average score
- Shortlisted count
- Rejected count
- Screening statistics


8. BACKEND DESIGN

The backend is implemented using Python and FastAPI.

The backend follows a REST API architecture.

Main backend responsibilities include:

- Authentication
- Job management
- Resume management
- Screening management
- Dashboard operations
- Candidate result retrieval
- Analytics
- Communication with n8n

The backend acts as the central application service between the frontend, database, and automation workflow.


9. DATABASE DESIGN

PostgreSQL is used as the main relational database.

The logical data relationship is:

USER
  |
  v
JOBS
  |
  +---- JOB DESCRIPTION
  |
  +---- RESUMES
  |
  +---- SCREENINGS
           |
           +---- CANDIDATES
           |
           +---- SCREENING RESULTS

9.1 Job Data

Job-related information includes:

- Job ID
- Job title
- Job description
- Required skills
- Preferred skills
- Experience requirements
- Education requirements
- Threshold
- Creation/update information

9.2 Resume Data

Resume-related data includes:

- Resume ID
- Candidate reference
- Original filename
- File information
- Processing status
- Extracted candidate information

9.3 Screening Data

Screening records represent individual screening runs.

Information includes:

- Screening ID
- Job reference
- Screening status
- Number of resumes
- Start time
- Completion time
- Processing status
- Error information when applicable

9.4 Screening Result Data

Screening results include:

- Candidate
- Score
- Decision
- Matching information
- Summary
- Extracted information
- Associated screening


10. RESUME PROCESSING DESIGN

Resume processing begins when HR uploads one or more resumes.

The processing flow is:

Resume Upload
      |
      v
File Validation
      |
      v
File Type Detection
      |
      v
Text Extraction
      |
      v
Text Normalization
      |
      v
Candidate Information Extraction
      |
      v
Structured Candidate Data
      |
      v
JD Matching
      |
      v
Scoring

10.1 File Validation

Uploaded files are checked before processing.

Validation can include:

- File type
- File size
- File integrity
- Required file information

10.2 Text Extraction

The processing workflow extracts text from supported resume formats.

For document-based resumes, the system extracts readable document content.

Where required, OCR can be used for scanned or image-based content.

10.3 Text Normalization

Extracted resume text can be normalized to improve processing quality.

Normalization may include:

- Whitespace cleanup
- Encoding cleanup
- De-hyphenation
- Section identification
- Removal of unnecessary formatting artifacts

10.4 Candidate Information Extraction

The extracted text is transformed into structured candidate information.

Typical fields include:

- Name
- Email
- Phone
- Location
- Education
- Skills
- Experience
- Projects
- Technologies
- Other relevant information

Example structured representation:

{
  "personal": {
    "name": "Candidate Name",
    "email": "candidate@example.com",
    "phone": "+91-XXXXXXXXXX"
  },
  "education": [],
  "skills": {},
  "experience": [],
  "projects": []
}

Structured data allows the next stages of the workflow to process candidate information consistently.


11. JOB DESCRIPTION PROCESSING DESIGN

The Job Description is converted into structured requirements.

The system identifies requirements such as:

- Required skills
- Preferred skills
- Required experience
- Education
- Project expectations
- Other relevant requirements

The logical flow is:

JOB DESCRIPTION
       |
       v
Requirement Extraction
       |
       v
Structured JD
       |
       v
JD-to-Resume Matching


12. LLM AND AI PROCESSING DESIGN

The system uses Ollama as the local LLM serving layer.

The LLM is responsible for semantic understanding rather than acting as the final scoring authority.

12.1 LLM Responsibilities

The LLM assists with:

- Resume understanding
- Candidate information extraction
- Skill interpretation
- Experience interpretation
- Project interpretation
- Semantic JD matching
- Candidate summary generation

12.2 LLM Processing Flow

Resume Text
    |
    v
Information Extraction
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
Matching Results

12.3 Structured Output

Structured output is used so that information returned by the LLM can be passed consistently into subsequent workflow and scoring stages.

The LLM therefore acts as an interpretation and matching layer rather than a completely unrestricted decision-making layer.


13. JD-TO-RESUME MATCHING DESIGN

The system compares candidate information against the structured Job Description.

The matching process considers:

- Required skills
- Relevant experience
- Education
- Projects
- Preferred skills
- Overall JD alignment

The LLM assists in semantic comparison.

For example, a candidate may demonstrate experience using a technology or concept without using exactly the same wording as the JD. The matching stage is intended to identify this type of semantic relationship.

The output of this stage is a set of matching assessments that are passed to the scoring engine.


14. SCORING AND DECISION DESIGN

The system applies a weighted scoring model.

The scoring categories are:

Criterion                  Weight
------------------------------------------------
Required Skills              40%
Relevant Experience          20%
Education                    15%
Projects                     15%
Preferred Skills              5%
Overall Alignment             5%
------------------------------------------------
Total                       100%

A configured screening threshold is then applied to the final score.

For the configured AI Engineer Intern example, the threshold is 70.

Decision logic:

Candidate Matching
       |
       v
Weighted Scoring
       |
       v
Final Score
       |
       +----------------------+
       |                      |
       v                      v
 Score >= Threshold      Score < Threshold
       |                      |
       v                      v
 Shortlisted               Rejected
       |                      |
       v                      v
Google Sheets           Rejection Email

14.1 Deterministic Scoring

The final numeric score is calculated using the defined weighted criteria rather than allowing the LLM to freely choose the final score.

This approach supports:

- Consistency
- Explainability
- Reproducibility
- Auditability

The configured weights can be reviewed and adjusted according to the recruitment requirements.


15. N8N WORKFLOW DESIGN

n8n is the workflow automation and orchestration layer.

The workflow begins when the backend triggers the screening process.

15.1 Main Workflow

Webhook
   |
   v
Retrieve Screening Request
   |
   v
Retrieve JD and Resumes
   |
   v
File Validation
   |
   v
File Type Routing
   |
   v
Text Extraction / OCR
   |
   v
Text Validation
   |
   v
Information Extraction
   |
   v
Ollama Chat Model
   |
   v
Structured Candidate Data
   |
   v
JD-to-Resume Matching
   |
   v
Scoring
   |
   v
IF Decision
   |
   +---------------------------+
   |                           |
   v                           v
Shortlisted                  Rejected
   |                           |
   v                           v
Google Sheets             Send Email

15.2 Webhook

The webhook acts as the entry point for the automated screening process.

Local development endpoint:

http://localhost:5678/webhook/resume-screening

15.3 File Type Routing

The workflow identifies the uploaded file format and routes the file to the appropriate processing stage.

15.4 Text Extraction / OCR

The workflow extracts readable content from the uploaded resume.

OCR can be applied where the content does not contain usable machine-readable text.

15.5 Information Extraction

The extracted text is passed through an information extraction stage to obtain structured candidate data.

15.6 Ollama Chat Model

The Ollama model processes the candidate information and assists with understanding and JD matching.

15.7 JD Matching

Candidate information is compared with the structured JD requirements.

15.8 Scoring

Matching results are passed into the scoring logic to generate the candidate's numerical score.

15.9 IF Decision

The workflow checks the score against the configured threshold.

15.10 Shortlisted Branch

Candidates meeting or exceeding the threshold are processed through the shortlisted branch.

The relevant candidate information and screening details can be recorded in Google Sheets.

15.11 Rejected Branch

Candidates below the configured threshold are processed through the rejection branch.

An automated rejection email is sent using the configured email service.


16. GOOGLE SHEETS INTEGRATION

Google Sheets provides an external reporting layer for shortlisted candidates and screening results.

The reporting data can contain:

- Candidate name
- Email
- Phone
- Skills
- Education
- Experience
- Matching score
- Screening summary
- Screening decision

The integration is handled through the n8n workflow.

The application uses secure credential configuration rather than storing Google authentication credentials directly in the source code.


17. EMAIL NOTIFICATION DESIGN

The email service is integrated into the rejected-candidate branch of the workflow.

The flow is:

Screening Decision
       |
       v
Score Below Threshold
       |
       v
Candidate Email Retrieved
       |
       v
Rejection Email Generated
       |
       v
Email Service
       |
       v
Candidate Notification

The email process is automated through n8n.

The email configuration is maintained through environment variables and secured credentials.


18. AUTHENTICATION AND SECURITY DESIGN

Security is an important part of the application because resumes and candidate information are sensitive.

18.1 Authentication

The application uses JWT-based authentication.

A successful login produces an access token that is used to access protected application resources.

18.2 Protected Routes

Frontend routes require authentication.

Unauthenticated users are redirected to the login page.

18.3 Password Security

Passwords are handled using bcrypt-based password hashing and verification.

Plain-text password comparison is not used for normal authentication.

18.4 Secret Management

Sensitive configuration is stored using environment variables.

Examples include:

- JWT secret
- Database URL
- n8n configuration
- HR credentials
- Email credentials
- API credentials

Sensitive values are not stored in source-controlled environment files.

18.5 CORS

CORS configuration is environment-based so that allowed frontend origins can be changed without modifying application logic.

18.6 Candidate Data Protection

Candidate data should only be accessible to authorized application users and trusted workflow services.

Uploaded files and personal candidate information should not be exposed through public source repositories.


19. API DESIGN

The React frontend communicates with the FastAPI backend through REST APIs.

Major API areas include:

19.1 Authentication APIs

Used for:

- Login
- Forgot Password
- Password Reset

19.2 Job APIs

Used for:

- Create job
- Retrieve jobs
- Update job
- Delete job

19.3 Resume APIs

Used for:

- Resume upload
- Resume management
- Resume association with jobs/screenings

19.4 Screening APIs

Used for:

- Create screening
- Start screening
- Retrieve screening status
- Cancel screening
- Retrieve screening results

19.5 Dashboard APIs

Used for:

- Dashboard overview
- Screening statistics
- Candidate counts

19.6 Analytics APIs

Used for:

- Screening statistics
- Candidate distribution
- Score-related metrics


20. END-TO-END DATA FLOW

The complete system operates in the following sequence:

1. HR opens the web application.

2. HR authenticates using the login page.

3. The backend validates the credentials and returns an authentication token.

4. HR creates or selects a job.

5. HR provides or uploads the Job Description.

6. HR uploads one or more candidate resumes.

7. The FastAPI backend receives the screening request.

8. A screening record is created.

9. The backend triggers the n8n workflow.

10. n8n retrieves the screening information and resumes.

11. Uploaded files are validated.

12. Resume file types are identified.

13. Resume text is extracted.

14. OCR is applied where required.

15. Candidate information is structured.

16. The LLM analyzes the structured candidate information.

17. The Job Description requirements are interpreted.

18. Candidate information is compared against the JD.

19. Matching results are generated.

20. The scoring engine calculates the final score.

21. The score is compared with the configured threshold.

22. Candidates meeting the threshold are marked as shortlisted.

23. Shortlisted candidate information is written to Google Sheets.

24. Candidates below the threshold are marked as rejected.

25. Rejected candidates receive an automated email.

26. Screening results are stored and associated with the relevant job/screening.

27. The frontend retrieves results from the backend.

28. HR can view candidates and analytics.

29. The HR user can log out after completing the screening activity.


21. ERROR HANDLING AND LOGGING

The system can encounter failures at multiple stages.

Potential failure points include:

- Invalid file upload
- Unsupported file format
- File extraction failure
- OCR failure
- Empty extracted text
- Invalid LLM output
- JSON validation failure
- n8n workflow failure
- Database failure
- Google Sheets failure
- Email failure
- API request failure
- Authentication failure

The system should handle failures without unnecessarily stopping unrelated candidate processing.

Examples of error handling include:

- Input validation
- API error responses
- Retry mechanisms
- Workflow branching
- Screening status updates
- Logging
- User-facing status messages
- Screening cancellation

For long-running screening operations, the frontend polls the screening status for a bounded period and provides a cancellation option rather than continuing indefinitely.


22. DEPLOYMENT ARCHITECTURE

The backend supports containerized deployment through Docker.

Backend container structure:

Docker
   |
   v
Python 3.11 Environment
   |
   v
FastAPI
   |
   v
Uvicorn
   |
   v
Application APIs

The project also includes Docker Compose configuration for backend deployment.

Environment variables are supplied separately through the .env configuration.

Frontend deployment can be handled as a React/Vite application and configured to communicate with the deployed backend using the appropriate API base URL.


23. SCALABILITY DESIGN

The architecture separates application responsibilities into independent layers.

This allows individual components to be improved or scaled independently.

Potential future scalability improvements include:

- Asynchronous processing
- Queue-based processing
- Worker-based resume processing
- Batch processing
- Dedicated LLM infrastructure
- Cloud file storage
- Database indexing and optimization
- Workflow monitoring
- Centralized logging
- Container orchestration
- Distributed n8n execution
- Caching
- Horizontal scaling of backend services

For high-volume recruitment environments, resume processing can be moved from a single synchronous workflow into queue-based worker processing.


24. NON-FUNCTIONAL REQUIREMENTS

24.1 Security

The system should protect authentication credentials, candidate information, uploaded files, API credentials, and workflow credentials.

24.2 Performance

The architecture should support processing multiple resumes while keeping the HR interface responsive.

24.3 Reliability

Failures in individual processing stages should be detected and handled appropriately.

24.4 Maintainability

Frontend, backend, workflow, database, and AI components are separated so that each component can be modified independently.

24.5 Usability

The interface should allow HR users to complete the screening process with minimal manual steps.

24.6 Explainability

The screening process uses defined scoring criteria so that the final score can be understood through its contributing categories.

24.7 Scalability

The architecture should allow additional processing capacity and infrastructure to be introduced as resume volume increases.


25. LIMITATIONS

The current system has several practical limitations.

1. LLM output quality depends on the quality of the extracted resume text and model configuration.

2. OCR accuracy can vary depending on the quality of scanned documents.

3. Resume formatting differences can affect information extraction.

4. Screening results should be considered decision-support information rather than a replacement for human recruitment decisions.

5. Local LLM processing depends on the computing resources available on the deployment machine.

6. External service availability can affect Google Sheets and email operations.

7. The initial workflow is primarily designed around supported resume content and English-language processing.


26. FUTURE ENHANCEMENTS

Future versions of the system can include:

- Advanced candidate search
- Candidate ranking
- Resume similarity search
- Vector database integration
- Retrieval-Augmented Generation (RAG)
- Multilingual resume processing
- Advanced OCR
- ATS integrations
- Interview scheduling
- Candidate communication tracking
- Role-based HR permissions
- Audit dashboards
- Advanced workflow monitoring
- Cloud deployment
- Distributed resume processing
- Model comparison and evaluation
- Bias and fairness monitoring
- More detailed candidate explanations


27. CONCLUSION

The Automated Resume Screening System combines a modern web application architecture with workflow automation and AI-assisted resume analysis.

React provides the HR-facing interface, FastAPI manages application APIs and business operations, PostgreSQL provides persistent storage, n8n orchestrates the processing workflow, and Ollama provides the local LLM layer for intelligent information extraction and semantic matching.

The screening pipeline converts unstructured resumes into structured candidate information, compares candidates with Job Description requirements, calculates a weighted score, and applies a configurable threshold to determine the screening branch.

Shortlisted candidates can be recorded in Google Sheets, while candidates below the threshold can receive automated rejection emails.

The layered architecture provides a structured foundation for maintainability, security, workflow automation, and future scalability while keeping the final hiring decision with human HR personnel and hiring managers.
