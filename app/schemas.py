from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    username: str
    password: str

class JobCreate(BaseModel):
    title: str
    description: str
    required_skills: List[str]

class JobOut(BaseModel):
    id: int
    title: str
    similarity_score: Optional[float] = None

    class Config:
        orm_mode = True
