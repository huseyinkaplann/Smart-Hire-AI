import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        username,
        password,
      });
      setMessage("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage("Bu kullanıcı adı zaten mevcut.");
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleRegister}>
        <input
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default RegisterPage;
