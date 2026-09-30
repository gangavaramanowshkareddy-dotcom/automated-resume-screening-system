 Automated Resume Screening System

An AI-assisted automated resume screening platform designed to help HR teams process Job Descriptions and multiple candidate resumes, extract candidate information, evaluate candidates against the JD, calculate screening scores, automate shortlist/rejection actions, and maintain structured screening results.

 Overview

The system combines a React frontend, FastAPI backend, PostgreSQL database, n8n workflow automation, and a local LLM served through Ollama.

The application is designed to automate the repetitive parts of initial resume screening while keeping HR in control of the screening threshold and final hiring decision.

Key Features

- HR login and protected application routes
- Job creation and job management
- Job Description upload and configuration
- Multiple resume upload
- Resume processing and information extraction
- PDF/DOCX/image-based resume handling
- AI-assisted JD-to-resume matching
- Candidate scoring
- Configurable screening threshold
- Automated shortlist processing
- Automated rejection emails
- Google Sheets reporting
- Candidate results and summaries
- Dashboard statistics
- Candidate analytics
- Screening cancellation support
- Password reset functionality
- JWT-based authentication
- PostgreSQL persistence
- Docker support

 System Architecture

```text
                    HR / Recruiter
                          |
                          v
                  React Frontend
                          |
                          v
                   FastAPI Backend
                    /           \
                   /             \
                  v               v
            PostgreSQL       n8n Workflow
                                  |
                +-----------------+-----------------+
                |                 |                 |
                v                 v                 v
         Resume Processing    Ollama / LLM     Email Service
                |                 |
                v                 v
        Candidate Extraction  JD Matching
                                  |
                                  v
                           Scoring / Decision
                              /         \
                             /           \
                            v             v
                     Shortlisted       Rejected
                            |             |
                            v             v
                     Google Sheets   Rejection Email
