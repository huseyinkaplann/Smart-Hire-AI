import { useState } from "react";
import api from "../api/axios";

function CvMatchPage() {
  const [file, setFile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMatch = async () => {
    if (!file) return alert("Lütfen bir PDF dosyası seçin.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/cv/match", formData);
      setMatches(res.data.matches);
    } catch (err) {
      alert("Eşleştirme sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>CV – İş İlanı Eşleştirme</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleMatch} disabled={loading}>
        {loading ? "Eşleştiriliyor..." : "Eşleştir"}
      </button>

      {matches.length > 0 && (
        <div>
          <h3>Eşleşmeler:</h3>
          <ul>
            {matches.map((match) => (
              <li key={match.job_id}>
                <strong>{match.title}</strong> – Benzerlik:{" "}
                {(match.similarity_score * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CvMatchPage;
