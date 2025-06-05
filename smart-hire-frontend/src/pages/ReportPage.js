import { useEffect, useState } from "react";
import api from "../api/axios";

function ReportPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get("/report/top-posters");
        setData(res.data);
      } catch (err) {
        console.error("Rapor alınamadı:", err);
      }
    };

    fetchReport();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        En Aktif İlan Ekleyen Kullanıcılar
      </h2>
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-800 text-left">
            <tr>
              <th className="px-4 py-3">Kullanıcı Adı</th>
              <th className="px-4 py-3">Toplam İlan</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((user, i) => (
              <tr
                key={i}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">{user.username}</td>
                <td className="px-4 py-3">{user.job_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportPage;
