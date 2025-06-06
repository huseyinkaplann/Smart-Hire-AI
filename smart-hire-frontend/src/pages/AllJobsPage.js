// src/pages/AllJobsPage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Alert, CircularProgress, List, ListItem, ListItemText, Divider } from '@mui/material';
import JobService from '../services/jobService';

function AllJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await JobService.getAllJobs();
        // Backend'den gelen verinin yapısını kontrol edelim
        // Eğer her iş ilanının içinde 'required_skills' dizisi yoksa veya null ise, boş bir dizi olarak işleyelim.
        // Aynı şekilde 'description' da kontrol edilebilir.
        const fetchedJobs = response.data.map(job => ({
            ...job,
            description: job.description || 'Açıklama bulunmamaktadır.', // Null veya boşsa default değer ata
            required_skills: Array.isArray(job.required_skills) ? job.required_skills : [], // Dizi değilse boş dizi yap
        }));
        setJobs(fetchedJobs);
      } catch (err) {
        setError(err.response?.data?.detail || 'İş ilanları getirilirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
        <Typography component="h1" variant="h5" gutterBottom>
          Tüm İş İlanları
        </Typography>
        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : error ? (
          <Alert severity="error" sx={{ mt: 4, width: '100%' }}>{error}</Alert>
        ) : jobs.length > 0 ? (
          <List sx={{ width: '100%' }}>
            {jobs.map((job, index) => (
              <React.Fragment key={job.id}> {/* job.id'nin unique olduğunu varsayıyoruz */}
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={job.title}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Açıklama:
                        </Typography>
                        {` ${job.description}`}
                        <br />
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Gerekli Yetenekler:
                        </Typography>
                        {/* Yetenekler dizisi varsa join et, yoksa "Belirtilmemiş" yaz */}
                        {` ${job.required_skills && job.required_skills.length > 0 ? job.required_skills.join(', ') : 'Belirtilmemiş'}`}
                      </>
                    }
                  />
                </ListItem>
                {index < jobs.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ mt: 4 }}>Henüz iş ilanı bulunmamaktadır.</Typography>
        )}
      </Box>
    </Container>
  );
}

export default AllJobsPage;