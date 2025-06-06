// src/pages/CvMatchPage.js
import React, { useState } from 'react';
import { Button, Box, Typography, Container, Alert, CircularProgress, List, ListItem, ListItemText, Divider } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CvService from '../services/cvService';

function CvMatchPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [matchingResults, setMatchingResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setError('');
      setMatchingResults(null); // Yeni dosya seçildiğinde önceki sonuçları temizle
    } else {
      setSelectedFile(null);
      setError('Lütfen sadece PDF dosyası yükleyin.');
      setMatchingResults(null);
    }
  };

  const handleMatch = async () => {
    setError('');
    setSuccess('');
    setMatchingResults(null);

    if (!selectedFile) {
      setError('Lütfen bir dosya seçin.');
      return;
    }

    setLoading(true);
    try {
      const response = await CvService.matchCv(selectedFile);
      setMatchingResults(response.data);
      setSuccess('CV başarıyla eşleştirildi!');
    } catch (err) {
      setError(err.response?.data?.detail || 'CV eşleştirilirken bir hata oluştu.');
    } finally {
      setLoading(false);
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
          CV Eşleştir
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          Yüklediğiniz CV'ye en uygun iş ilanlarını bulun.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            CV Dosyası Seç
            <input
              type="file"
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
            onClick={handleMatch}
            disabled={!selectedFile || loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Eşleştir'}
          </Button>

          {matchingResults && (
            <Box sx={{ mt: 4, width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Eşleşen İş İlanları:
              </Typography>
              {matchingResults?.matches?.length > 0 ? (
                <List>
                  {matchingResults.matches.map((job, index) => (
                    <React.Fragment key={job.job_id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={job.title}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                Eşleşme Oranı:
                              </Typography>
                              {` %${(job.similarity_score * 100).toFixed(2)}`}
                            </>
                          }
                        />
                      </ListItem>
                      {index < matchingResults.matches.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body1">Eşleşen iş ilanı bulunamadı.</Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default CvMatchPage;