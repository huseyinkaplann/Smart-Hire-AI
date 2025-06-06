from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, cv, job, report
from app.database import engine
from app.models_db import Base

app = FastAPI(title="SmartHire AI - CV Matching System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(cv.router)
app.include_router(job.router)
app.include_router(report.router)

@app.get("/")
def read_root():
    return {"message": "SmartHire AI backend is running"}