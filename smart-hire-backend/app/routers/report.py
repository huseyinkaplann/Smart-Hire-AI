from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models_db import Job, User

router = APIRouter(prefix="/report", tags=["Reporting"])

@router.get("/top-posters")
def most_active_users(db: Session = Depends(get_db)):
    result = (
        db.query(User.username, func.count(Job.id).label("job_count"))
        .join(Job)
        .group_by(User.id)
        .order_by(func.count(Job.id).desc())
        .all()
    )
    return [{"username": r[0], "job_count": r[1]} for r in result]
