#Schemas.py
from pydantic import BaseModel, validator
from typing import List, Optional

class UserCreate(BaseModel):
    username: str
    password: str
    role: Optional[str] = "Basvuran"

class UserOut(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        from_attributes = True

class JobCreate(BaseModel):
    title: str
    description: str
    required_skills: List[str]

class JobOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    required_skills: List[str] = []
    similarity_score: Optional[float] = None

    @validator("required_skills", pre=True)
    def parse_skills(cls, v):
        if isinstance(v, str):
            return [s.strip() for s in v.split(";") if s.strip()]
        return v

    class Config:
        from_attributes = True