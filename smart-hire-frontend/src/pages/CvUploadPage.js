import { useState } from "react";
import api from "../api/axios";

function CvUploadPage() {
  const [file, setFile] = useState(null);
  const [cvText, setCvText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Lütfen bir PDF dosyası seçin.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/cv/upload", formData);
      setCvText(res.data.cv_text);
      setAnalysis(res.data.analysis);
    } catch (err) {
      alert("Yükleme veya analiz sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>CV Yükle ve Analiz Et</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Yükleniyor..." : "Yükle ve Analiz Et"}
      </button>

      {cvText && (
        <div>
          <h3>CV'den Okunan Metin (ilk 300 karakter):</h3>
          <pre>{cvText}</pre>
        </div>
      )}

      {analysis && (
        <div>
          <h3>AI Analizi:</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
}

export default CvUploadPage;
