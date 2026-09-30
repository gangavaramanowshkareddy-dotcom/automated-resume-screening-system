from sqlalchemy import Column, Integer, String, Text, BigInteger, Numeric, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from database import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True)

    job_title = Column(String(255), nullable=False)

    job_description = Column(Text, nullable=False)

    required_skills = Column(JSONB)

    preferred_skills = Column(JSONB)

    required_education = Column(JSONB)

    required_experience = Column(JSONB)

    other_requirements = Column(JSONB)

    threshold = Column(Numeric(5, 2), default=70)

    required_skills_weight = Column(Numeric(5, 2), default=40)

    relevant_experience_weight = Column(Numeric(5, 2), default=20)

    education_weight = Column(Numeric(5, 2), default=15)

    projects_weight = Column(Numeric(5, 2), default=15)

    preferred_skills_weight = Column(Numeric(5, 2), default=5)

    overall_alignment_weight = Column(Numeric(5, 2), default=5)

    created_at = Column(DateTime, server_default=func.now())


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True)

    name = Column(String(255))

    email = Column(String(255))

    phone = Column(String(50))

    location = Column(String(255))

    education = Column(JSONB)

    skills = Column(JSONB)

    experience = Column(JSONB)

    projects = Column(JSONB)

    strengths = Column(JSONB)

    gaps = Column(JSONB)

    jd_alignment_notes = Column(Text)

    created_at = Column(DateTime, server_default=func.now())


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True)

    job_id = Column(
        Integer,
        ForeignKey("jobs.id", ondelete="CASCADE")
    )

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id", ondelete="CASCADE")
    )

    file_name = Column(String(255), nullable=False)

    file_type = Column(String(100))

    file_size = Column(BigInteger)

    storage_reference = Column(Text)

    uploaded_at = Column(DateTime, server_default=func.now())


class Screening(Base):
    __tablename__ = "screenings"

    id = Column(Integer, primary_key=True)

    job_id = Column(
        Integer,
        ForeignKey("jobs.id", ondelete="CASCADE")
    )

    status = Column(String(50), default="pending")

    started_at = Column(DateTime)

    completed_at = Column(DateTime)

    created_at = Column(DateTime, server_default=func.now())


class ScreeningScore(Base):
    __tablename__ = "screening_scores"

    id = Column(Integer, primary_key=True)

    screening_id = Column(
        Integer,
        ForeignKey("screenings.id", ondelete="CASCADE")
    )

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id", ondelete="CASCADE")
    )

    required_skills_score = Column(Numeric(5, 2))

    relevant_experience_score = Column(Numeric(5, 2))

    education_score = Column(Numeric(5, 2))

    projects_score = Column(Numeric(5, 2))

    preferred_skills_score = Column(Numeric(5, 2))

    overall_alignment_score = Column(Numeric(5, 2))

    final_score = Column(Numeric(5, 2))

    decision = Column(String(50))

    created_at = Column(DateTime, server_default=func.now())


class ProcessingLog(Base):
    __tablename__ = "processing_logs"

    id = Column(Integer, primary_key=True)

    screening_id = Column(
        Integer,
        ForeignKey("screenings.id", ondelete="CASCADE")
    )

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id", ondelete="SET NULL")
    )

    step_name = Column(String(100), nullable=False)

    status = Column(String(50), nullable=False)

    input_reference = Column(Text)

    error_detail = Column(Text)

    created_at = Column(DateTime, server_default=func.now())


class EmailNotification(Base):
    __tablename__ = "email_notifications"

    id = Column(Integer, primary_key=True)

    screening_id = Column(
        Integer,
        ForeignKey("screenings.id", ondelete="CASCADE")
    )

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id", ondelete="SET NULL")
    )

    recipient_email = Column(String(255), nullable=False)

    notification_type = Column(String(50))

    status = Column(String(50))

    retry_count = Column(Integer, default=0)

    error_detail = Column(Text)

    sent_at = Column(DateTime)

    created_at = Column(DateTime, server_default=func.now())