import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { Button, Container, Typography, Box } from '@mui/material';
import '../LandingPage.css'; // Updated to use relative path for CSS

const LandingPage = () => {
  const navigate = useNavigate(); // Create a navigate function
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // State to hold the selected language

  const handleLanguageSelect = (language) => {
    console.log('Selected Language:', language);
    // Update selected language state
    setSelectedLanguage(language);
    
    // Navigate to the register page with the selected language
    navigate('/register', { state: { language } }); 
  };

  return (
    <Container className="landing-page" maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Bridge To Wellness
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Select Your Language
      </Typography>
      <Box className="language-buttons" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', maxHeight: '80vh' }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleLanguageSelect('en')}
          sx={{
            mb: 1,
            backgroundColor: '#6fbf92',
            '&:hover': {
              backgroundColor: '#5ca482',
            },
          }}
        >
          English
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleLanguageSelect('hi')}
          sx={{
            mb: 1,
            backgroundColor: '#6fbf92',
            '&:hover': {
              backgroundColor: '#5ca482',
            },
          }}
        >
          हिन्दी
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleLanguageSelect('es')}
          sx={{
            mb: 1,
            backgroundColor: '#6fbf92',
            '&:hover': {
              backgroundColor: '#5ca482',
            },
          }}
        >
          Español
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleLanguageSelect('ne')}
          sx={{
            mb: 1,
            backgroundColor: '#6fbf92',
            '&:hover': {
              backgroundColor: '#5ca482',
            },
          }}
        >
          नेपाली
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleLanguageSelect('ar')}
          sx={{
            mb: 1,
            backgroundColor: '#6fbf92',
            '&:hover': {
              backgroundColor: '#5ca482',
            },
          }}
        >
          العربية
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleLanguageSelect('bn')}
          sx={{
            mb: 1,
            backgroundColor: '#6fbf92',
            '&:hover': {
              backgroundColor: '#5ca482',
            },
          }}
        >
          বাংলা (Bengali)
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleLanguageSelect('zh')}
          sx={{
            mb: 1,
            backgroundColor: '#6fbf92',
            '&:hover': {
              backgroundColor: '#5ca482',
            },
          }}
        >
          中文 (Chinese)
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleLanguageSelect('vi')}
          sx={{
            mb: 1,
            backgroundColor: '#6fbf92',
            '&:hover': {
              backgroundColor: '#5ca482',
            },
          }}
        >
          Tiếng Việt (Vietnamese)
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
