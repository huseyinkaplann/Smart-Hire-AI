from fastapi import APIRouter, UploadFile, File
from app.utils.pdf_parser import extract_text_from_pdf
from app.services.ai_analysis import analyze_cv_text
from app.routers.job import job_db
from app.services.matching import match_cv_to_jobs

router = APIRouter(prefix="/cv", tags=["CV Processing"])

@router.post("/upload")
async def upload_cv(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    analysis = analyze_cv_text(text)
    return {"cv_text": text[:300], "analysis": analysis}

@router.post("match")
async def match_upload_cv(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    match_results = match_cv_to_jobs(text, job_db)
    return {"matches": match_results}