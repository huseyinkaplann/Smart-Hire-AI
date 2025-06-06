// src/pages/JobAddPage.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Alert, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import JobService from '../services/jobService';

function JobAddPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim() && !requiredSkills.includes(skillInput.trim())) {
      setRequiredSkills([...requiredSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => () => {
    setRequiredSkills((skills) => skills.filter((skill) => skill !== skillToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !description || requiredSkills.length === 0) {
      setError('Tüm alanları doldurmanız ve en az bir yetenek eklemeniz gerekmektedir.');
      return;
    }

    try {
      await JobService.addJob(title, description, requiredSkills);
      setSuccess('İş ilanı başarıyla eklendi!');
      setTitle('');
      setDescription('');
      setRequiredSkills([]);
    } catch (err) {
      setError(err.response?.data?.detail || 'İş ilanı eklenirken bir hata oluştu.');
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
          Yeni İş İlanı Ekle
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="İş Ünvanı"
            name="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="İş Tanımı"
            name="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <TextField
              fullWidth
              label="Gerekli Yetenek (örn: React, Python)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <Button variant="contained" onClick={handleAddSkill} startIcon={<AddIcon />}>
              Ekle
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {requiredSkills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={handleDeleteSkill(skill)}
                color="primary"
              />
            ))}
          </Box>

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            İş İlanı Oluştur
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default JobAddPage;