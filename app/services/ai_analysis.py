from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def analyze_cv_text(text: str) -> str:
    prompt = f"CV içeriği:\n{text}\n\nBu CV'deki kişinin güçlü ve zayıf yönlerini analiz et."

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Sen bir insan kaynakları uzmanısın."},
                {"role": "user", "content": prompt}
            ],
            max_tokens = 300
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"AI analiz hatası: {str(e)}"