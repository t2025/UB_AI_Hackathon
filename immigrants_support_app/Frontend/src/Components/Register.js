import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Categories from './Categories';

const RegisterLogin = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const selectedLanguage = location.state?.language || 'en';
  console.log(selectedLanguage);

  const [isLogin, setIsLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
    console.log('Language changed to:', selectedLanguage);
  }, [selectedLanguage, i18n]);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <Categories />;
  }
  console.log(t('login'))

  return (
    <Container component="main" maxWidth="xs" style={{ backgroundColor: '#d1e7d2', padding: '30px', borderRadius: '10px', minHeight: '100vh' }}>
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {isLogin ? t('login') : t('register')}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField margin="normal" required fullWidth id="email" label={t('emailAddress')} name="email" autoComplete="email" autoFocus />
          <TextField margin="normal" required fullWidth name="password" label={t('password')} type="password" id="password" autoComplete="current-password" />
          {!isLogin && (
            <TextField margin="normal" required fullWidth name="username" label={t('username')} type="text" id="username" />
          )}
          <Button type="submit" fullWidth variant="contained" sx={{
            mt: 3, mb: 2, backgroundColor: '#4CAF50', '&:hover': {
              backgroundColor: '#45a049',
            }, color: '#FFFFFF', borderRadius: '5px', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}>
            {isLogin ? t('login') : t('register')}
          </Button>
          <Button onClick={switchForm} variant="text" fullWidth>
            {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterLogin;
