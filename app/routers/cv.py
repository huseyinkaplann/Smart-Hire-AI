from fastapi import APIRouter, UploadFile, File, Depends
from app.utils.pdf_parser import extract_text_from_pdf
from app.services.ai_analysis import analyze_cv_text
from app.services.matching import match_cv_to_jobs

from sqlalchemy.orm import Session
from app.models_db import Job
from app.database import get_db
from app.utils.logger import log_event

router = APIRouter(prefix="/cv", tags=["CV Processing"])

@router.post("/match")
async def match_uploaded_cv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    
    # DB'den iş ilanlarını al
    jobs = db.query(Job).all()
    job_dicts = [
        {
            "id": j.id,
            "title": j.title,
            "description": j.description,
            "required_skills": j.required_skills.split(";")
        }
        for j in jobs
    ]

    match_results = match_cv_to_jobs(text, job_dicts)
    return {"matches": match_results}

@router.post("/match")  # 🔧 başındaki "/" eksikti, onu da düzelttim
async def match_upload_cv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    log_event(f"CV matched against jobs. File: {file.filename}")
    
    # Veritabanından ilanları çek
    jobs = db.query(Job).all()
    job_dicts = [
        {
            "id": j.id,
            "title": j.title,
            "description": j.description,
            "required_skills": j.required_skills.split(";")
        }
        for j in jobs
    ]
    
    match_results = match_cv_to_jobs(text, job_dicts)
    return {"matches": match_results}

@router.post("/upload")
async def upload_cv(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    analysis = analyze_cv_text(text)
    log_event(f"CV uploaded and analyzed. File name: {file.filename}")
    return {"cv_text": text[:300], "analysis": analysis}