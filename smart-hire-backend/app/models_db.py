#models_db.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    role = Column(String, default="Basvuran")
    password = Column(String)

    jobs = relationship("Job", back_populates="owner")

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    required_skills = Column(Text)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="jobs")

class CVAnalysis(Base):
    __tablename__ = "cv_analysis"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    cv_text = Column(Text)
    analysis_result = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", backref="cv_analyses")