// src/pages/ReportsPage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Alert, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ReportService from '../services/reportService';

function ReportsPage() {
  const [topPosters, setTopPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopPosters = async () => {
      try {
        const response = await ReportService.getTopPosters();
        setTopPosters(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Raporlar getirilirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosters();
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
          Raporlar: En Çok İş İlanı Ekleyen Kullanıcılar
        </Typography>
        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : error ? (
          <Alert severity="error" sx={{ mt: 4, width: '100%' }}>{error}</Alert>
        ) : topPosters.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 4, width: '100%' }}>
            <Table sx={{ minWidth: 400 }} aria-label="top posters table">
              <TableHead>
                <TableRow>
                  <TableCell>Kullanıcı Adı</TableCell>
                  <TableCell align="right">Eklenen İş İlanı Sayısı</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topPosters.map((poster, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {poster.username}
                    </TableCell>
                    <TableCell align="right">{poster.job_count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" sx={{ mt: 4 }}>Henüz raporlanacak veri bulunmamaktadır.</Typography>
        )}
      </Box>
    </Container>
  );
}

export default ReportsPage;