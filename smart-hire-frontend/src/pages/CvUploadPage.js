// src/pages/CvUploadPage.js
import React, { useState } from 'react';
import { Button, Box, Typography, Container, Alert, CircularProgress } from '@mui/material'; // CircularProgress'i ekledik
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CvService from '../services/cvService';

function CvUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cvData, setCvData] = useState(null); // Yeni state: CV'den gelen verileri saklamak için
  const [loading, setLoading] = useState(false); // Yeni state: Yükleme durumu için

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setError('');
      setCvData(null); // Yeni dosya seçildiğinde önceki verileri temizle
    } else {
      setSelectedFile(null);
      setError('Lütfen sadece PDF dosyası yükleyin.');
      setCvData(null);
    }
  };

  const handleUpload = async () => {
    setError('');
    setSuccess('');
    setCvData(null); // Yükleme öncesi verileri temizle

    if (!selectedFile) {
      setError('Lütfen bir dosya seçin.');
      return;
    }

    setLoading(true); // Yükleme başladı
    try {
      const response = await CvService.uploadCv(selectedFile);
      setSuccess('CV başarıyla yüklendi!');
      setCvData(response.data); // Gelen veriyi state'e kaydet
      setSelectedFile(null); // Dosya seçimini sıfırla
      document.getElementById('cv-upload-input').value = ''; // Input'u sıfırla
    } catch (err) {
      setError(err.response?.data?.detail || 'CV yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false); // Yükleme bitti
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          CV Yükle
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          Lütfen sadece PDF formatında CV yükleyiniz.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Dosya Seç
            <input
              type="file"
              id="cv-upload-input"
              hidden
              onChange={handleFileChange}
              accept="application/pdf"
            />
          </Button>
          {selectedFile && (
            <Typography variant="body1">
              Seçilen Dosya: **{selectedFile.name}**
            </Typography>
          )}
          {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>{success}</Alert>}
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'CV\'yi Yükle'}
          </Button>

          {/* CV Verilerini Görüntüleme */}
          {cvData && (
            <Box sx={{ mt: 4, width: '100%', p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
              <Typography variant="h6" gutterBottom>
                Yüklenen CV Verileri:
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
                CV Metni:
              </Typography>
              <Typography variant="body2" sx={{ maxHeight: 200, overflowY: 'auto', p: 1, border: '1px dashed #eee' }}>
                {cvData.cv_text || 'Metin bulunamadı.'}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
                Yükleyen:
              </Typography>
              <Typography variant="body2" sx={{ maxHeight: 200, overflowY: 'auto', p: 1, border: '1px dashed #eee' }}>
                {cvData.uploaded_by || 'Metin bulunamadı.'}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
                Analiz Sonuçları:
              </Typography>
              {cvData.analysis ? (
                typeof cvData.analysis === 'string' ? (
                  <Typography variant="body2" sx={{ maxHeight: 200, overflowY: 'auto', p: 1, border: '1px dashed #eee' }}>
                    {cvData.analysis}
                  </Typography>
                ) : (
                  <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: 200, overflowY: 'auto', p: 1, border: '1px dashed #eee', backgroundColor: '#f5f5f5' }}>
                    {JSON.stringify(cvData.analysis, null, 2)}
                  </pre>
                )
              ) : (
                <Typography variant="body2">Analiz sonucu bulunamadı.</Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default CvUploadPage;