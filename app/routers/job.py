from app.routers.auth import get_current_user
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/job", tags=["Job Listing"])

#Geçiçi veri deposu (veritabanı yerine kullanılacak)
job_db = []

class JobPost(BaseModel):
    title: str
    description: str
    required_skills: List[str]

@router.post("/add")
def add_job(job: JobPost, username: str = Depends(get_current_user)):
    job_entry = {
        "id": len(job_db + 1),
        "owner": username,
        "title": job.title,
        "description" : job.description,
        "required_skills": job.required_skills
    }
    job_db.append(job_entry)
    return {"message": "Job posted successfully", "job_id": job_entry["id"]}

@router.get("/all")
def get_all_jobs():
    return job_db