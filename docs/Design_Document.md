 Design Document
Automated Resume Screening System

1. Overview

The Automated Resume Screening System is an AI-powered recruitment solution designed to help HR teams screen multiple candidate resumes efficiently against a Job Description (JD).

The system automatically analyzes candidate resumes, compares candidate information and skills with the requirements of the JD, generates a matching score, and categorizes candidates as shortlisted or rejected based on a predefined threshold.

The system reduces manual resume screening effort and provides HR teams with structured candidate information and screening results.


 2. Product Objective

The main objective of the system is to automate the resume screening process from resume upload to candidate selection.

The system is designed to:

- Accept a Job Description from HR.
- Accept multiple candidate resumes.
- Extract relevant information from each resume.
- Compare each candidate resume against the Job Description.
- Calculate a matching score.
- Shortlist candidates who meet the required score.
- Reject candidates who fall below the required score.
- Automatically send rejection emails to rejected candidates.
- Store shortlisted candidate information and screening results.
- Store candidate data, scores, summaries, and screening results in Google Sheets for easy tracking and further recruitment activities.



 3. User

 HR / Recruiter

The primary user of the system is an HR professional or recruiter.

The HR user can:

- Create or enter a Job Description.
- Define required and preferred skills.
- Upload multiple candidate resumes.
- Start the automated screening process.
- Monitor screening progress.
- View shortlisted and rejected candidates.
- View candidate matching scores and summaries.
- Access screening results stored in Google Sheets.

---

4. High-Level Design

The system follows a modular architecture consisting of:

1. React Frontend
2. FastAPI Backend
3. PostgreSQL Database
4. File Storage
5. n8n Workflow Automation
6. Resume Processing and Extraction
7. LLM-based Analysis
8. Resume-to-JD Matching
9. Deterministic Scoring Engine
10. Email Notification Service
11. Google Sheets Integration

The frontend provides the user interface, while the FastAPI backend manages application APIs and database operations.

n8n is responsible for workflow orchestration and automation of the resume screening pipeline.



 5. System Workflow

The overall screening workflow is:


HR User
   |
   v
React Frontend
   |
   v
FastAPI Backend
   |
   v
n8n Workflow
   |
   v
Resume Processing
   |
   v
Candidate Information Extraction
   |
   v
JD-to-Resume Matching
   |
   v
Matching Score
   |
   v
Decision
   |
   +--------------------------+
   |                          |
   v                          v
Score >= 70              Score < 70
   |                          |
   v                          v
Shortlisted               Rejected
   |                          |
   v                          v
Google Sheets            Rejection Email
