#cv.py
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from app.utils.pdf_parser import extract_text_from_pdf
from app.services.ai_analysis import analyze_cv_text
from app.services.matching import match_cv_to_jobs
from app.models_db import Job, CVAnalysis
from app.database import get_db
from app.utils.logger import log_event

router = APIRouter(prefix="/cv", tags=["CV Processing"])

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    from app.models_db import User
    user = db.query(User).filter(User.username == username).first()
    return user

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
async def upload_cv(file: UploadFile = File(...), db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    analysis = analyze_cv_text(text)

    #DB'ye Kaydet
    cv_record = CVAnalysis(
        user_id=current_user.id,
        cv_text=text,
        analysis_result=analysis
    )
    db.add(cv_record)
    db.commit()
    db.refresh(cv_record)

    log_event(f"CV uploaded by user {current_user.username}. File: {file.filename}")
    return {"cv_text": text[:300], "analysis": analysis, "uploaded_by": current_user.username}