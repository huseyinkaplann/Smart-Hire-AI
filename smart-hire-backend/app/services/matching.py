from typing import List, Dict
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")

# Basit TF-IDF benzerliği ile eşleştirme (SBERT yerine başlangıç için yeterli)
def match_cv_to_jobs(cv_text: str, jobs: List[Dict]) -> List[Dict]:
    results = []

    cv_embedding = model.encode(cv_text, convert_to_tensor=True)

    for job in jobs:
        job_text = job["description"] + " " + " ".join(job["required_skills"])
        job_embedding = model.encode(job_text, convert_to_tensor=True)
        similarity = float(util.cos_sim(cv_embedding, job_embedding)[0][0])
        results.append({
            "job_id": job["id"],
            "title": job["title"],
            "similarity_score": round(similarity, 3)
        })

    return sorted(results, key=lambda x: x["similarity_score"], reverse=True)