import { useState } from "react";
import api from "../api/axios";

function AddJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // 🔐 Token doğrudan alınıyor

    if (!token) {
      setMessage("Oturum bulunamadı. Lütfen giriş yapın.");
      return;
    }

    try {
      const res = await api.post(
        "/job/add",
        {
          title,
          description,
          required_skills: skills.split(",").map((s) => s.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Header'a token açıkça eklendi
          },
        }
      );

      setMessage(`İlan eklendi! ID: ${res.data.job_id}`);
      setTitle("");
      setDescription("");
      setSkills("");
    } catch (err) {
      console.error("❌ Hata:", err.response?.data || err.message);
      setMessage("İlan eklenirken hata oluştu.");
    }
  };

  return (
    <div>
      <h2>Yeni İş İlanı Ekle</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="İlan Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="İlan Açıklaması"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Gerekli Beceriler (virgülle ayır)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <button type="submit">İlanı Ekle</button>
      </form>
    </div>
  );
}

export default AddJobPage;
