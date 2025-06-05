from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from app import schemas
from app.models_db import Job
from app.database import get_db
from app.dependencies import get_current_user

router = APIRouter(prefix="/job", tags=["Job Listing"])

@router.post("/add", response_model=dict)
def add_job(job: schemas.JobCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    job_entry = Job(
        title=job.title,
        description=job.description,
        required_skills=";".join(job.required_skills),
        owner_id=current_user.id
    )
    db.add(job_entry)
    db.commit()
    db.refresh(job_entry)
    return {"message": "Job posted successfully", "job_id": job_entry.id}

@router.get("/all", response_model=List[schemas.JobOut])
def get_all_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).all()
    return jobs