import React, { useState } from 'react';
import { Button, Container, Typography, Box, Card, CardContent, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const TranslateToImage = () => {
  const { t } = useTranslation(); // Use the translation hook
  const [transcript, setTranscript] = useState('');
  const [recording, setRecording] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false); // State to control visibility of results

  const startRecognition = () => {
    if (!recognition) {
      setError(t('error.noSpeechRecognition')); // Use translation for error message
      return;
    }

    recognition.lang = 'en-US';
    recognition.continuous = false; // Do not allow continuous speech recognition
    recognition.interimResults = false; // Show only final results

    recognition.onstart = () => {
      setRecording(true);
      setShowResults(false); // Hide results when starting recognition
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      generateImage(spokenText); // Generate image with the spoken text
    };

    recognition.onerror = (event) => {
      setError(t('error.speechRecognition', { error: event.error })); // Use translation for error message
    };

    recognition.onend = () => {
      setRecording(false);
      // Do not show results yet; they will be shown when "Stop Talking" is clicked
    };

    recognition.start();
  };

  const stopTalking = () => {
    if (recognition) {
      recognition.stop(); // Stop recognition
      setShowResults(true); // Show results when stopping
    }
  };

  const generateImage = async (prompt) => {
    try {
      const response = await fetch('http://localhost:5000/generate-image', { // Adjust the URL to your backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl); // Assuming your backend returns the image URL
    } catch (error) {
      setError(t('error.imageGeneration', { message: error.message })); // Use translation for error message
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        backgroundColor: '#d1e7dd', // Pastel green background
        borderRadius: '8px',
        padding: '20px',
        minHeight: '100vh'
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {t('title')} {/* Use translation for title */}
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" align="center">
              {t('speak')} {/* Use translation for description */}
            </Typography>
          </Box>

          {/* Error Message */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Speech Recognition */}
          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={startRecognition}
              disabled={recording}
              sx={{
                mt: 2,
                mb: 1,
                backgroundColor: '#6fbf92', // Custom button color
                '&:hover': {
                  backgroundColor: '#5ca482', // Darker shade on hover
                },
              }}
            >
              {t('startTalking')} {/* Use translation for button text */}
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={stopTalking}
              disabled={!recording}
              sx={{
                mt: 1,
                mb: 1,
                backgroundColor: '#e57373', // Custom stop button color
                '&:hover': {
                  backgroundColor: '#ef5350', // Darker shade on hover
                },
              }}
            >
              {t('stopTalking')} {/* Use translation for button text */}
            </Button>
          </Box>

          {/* Show results only if "Stop Talking" is clicked */}
          {showResults && (
            <Box>
              <Typography variant="body1">
                {transcript ? t('youSaid', { text: transcript }) : t('youSaid', { text: t('placeholderText') })}
              </Typography>

              {/* Generated Image */}
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="h6">{t('generatedImage')}</Typography>
                {generatedImage ? (
                  <img src={generatedImage} alt="Generated" style={{ width: '100%', borderRadius: '8px' }} />
                ) : (
                  <img
                    src="/placeholder.jpg" // Update this path to your actual placeholder image path
                    alt="Placeholder"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                )}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default TranslateToImage;
