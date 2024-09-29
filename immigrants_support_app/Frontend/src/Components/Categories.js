import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Importing useTranslation

const Categories = () => {
  const { t } = useTranslation(); // Getting the translation function

  return (
    <Container maxWidth="md" style={{ backgroundColor: '#d1e7dd', padding: '20px', borderRadius: '10px', minHeight: '100vh' }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          {t('chooseCategory')} {/* Translated title */}
        </Typography>

        {/* Feeling Low Category */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: '#FF9800',
            '&:hover': {
              backgroundColor: '#FB8C00',
            },
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }} 
          href="/feeling-low"
        >
          {t('feelingLow')} {/* Translated text */}
        </Button>

        {/* Academic Help */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: '#FF9800',
            '&:hover': {
              backgroundColor: '#FB8C00',
            },
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }} 
          href="https://www.buffalo.edu/studentsuccess/resources.html" 
          target="_blank"
        >
          {t('academicHelp')} {/* Translated text */}
        </Button>

        {/* Financial Help */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: '#FF9800',
            '&:hover': {
              backgroundColor: '#FB8C00',
            },
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }} 
          href="https://unitedwedream.org/our-work/" 
          target="_blank"
        >
          {t('financialHelp')} {/* Translated text */}
        </Button>

        {/* Immigration Help */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: '#FF9800',
            '&:hover': {
              backgroundColor: '#FB8C00',
            },
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }} 
          href="https://www.uscis.gov/sites/default/files/document/guides/M-618.pdf" 
          target="_blank"
        >
          {t('immigrationHelp')} {/* Translated text */}
        </Button>

        {/* Jobs and Career */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: '#FF9800',
            '&:hover': {
              backgroundColor: '#FB8C00',
            },
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }} 
          href="https://www.upwardlyglobal.org/" 
          target="_blank"
        >
          {t('jobsAndCareer')} {/* Translated text */}
        </Button>

        {/* Translate to Images */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: '#FF9800',
            '&:hover': {
              backgroundColor: '#FB8C00',
            },
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }} 
          href="/translate-to-image"
        >
          {t('translateToImage')} {/* Translated text */}
        </Button>
      </Box>
    </Container>
  );
};

export default Categories;
