import React, { useState, useRef } from 'react';
import { Button, Container, Typography, Box, Card, CardContent, Alert } from '@mui/material';
import Sentiment from 'sentiment'; // Sentiment analysis library

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const responses = {
  'hi': 'Hello! How can I help you today?',
  'how are you': 'I’m just a bot, but I’m here to listen!',
  'help': 'I’m here for you. What do you need help with?',
  'bye': 'Goodbye! Take care!',
  // Add more responses as needed
};

const positiveResponses = [
  "Great to hear that!",
  "I'm glad you're feeling good!",
  "That's wonderful!",
  "Awesome! How can I assist you further?"
];

const negativeResponses = [
  "I'm sorry to hear that.",
  "It's okay to feel down sometimes.",
  "I'm here for you. Want to talk about it?",
  "Let me know how I can help you."
];

const neutralResponses = [
  "Thanks for sharing that.",
  "I see, how can I help you?",
  "Got it, feel free to share more.",
  "I'm here to assist, what would you like to do next?"
];

const SpeechToTextBot = () => {
  const [transcript, setTranscript] = useState('');
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [previousAudioURL, setPreviousAudioURL] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [translatedAudio, setTranslatedAudio] = useState('');
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const sentimentAnalyzer = new Sentiment();

  // Start Speech Recognition
  const startRecognition = () => {
    if (!recognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setRecording(true);
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[event.resultIndex][0].transcript;
      setTranscript(spokenText);
    };

    recognition.onerror = (event) => {
      setError(`Error occurred in speech recognition: ${event.error}`);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.start();
  };
// Analyze Sentiment
const analyzeSentiment = (text) => {
  const result = sentimentAnalyzer.analyze(text);
  const sentimentScore = result.score;

  // Set sentiment based on score
  if (sentimentScore > 0) {
    setSentiment('Positive');
  } else if (sentimentScore < 0) {
    setSentiment('Negative');
  } else {
    setSentiment('Neutral');
  }
};

// Generate Bot Response
const generateBotResponse = (userText) => {
  const normalizedText = userText.trim().toLowerCase(); // Normalize input
  let botReply;

  // Use sentiment to determine the response
  if (sentiment === 'Positive') {
    botReply = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
  } else if (sentiment === 'Negative') {
    botReply = negativeResponses[Math.floor(Math.random() * negativeResponses.length)];
  } else if (sentiment === 'Neutral') {
    botReply = neutralResponses[Math.floor(Math.random() * neutralResponses.length)];
  } else {
    botReply = responses[normalizedText] || "I'm not sure how to respond to that.";
  }

  addChatMessage('BTW Bot', botReply);
};

  


  // Add Chat Message
  const addChatMessage = (sender, message) => {
    setChatHistory(prev => [...prev, { sender, message }]);
  };

  // Start Recording Audio
  const startRecordingAudio = async () => {
    audioChunksRef.current = []; // Clear previous audio chunks
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Move current recording to previousAudioURL
        if (audioURL) {
          setPreviousAudioURL(audioURL);
        }

        setAudioURL(audioUrl); // Set the new recording
      };

      mediaRecorderRef.current.start();
      setRecording(true); // Set recording state to true
    } catch (err) {
      setError(`Error accessing microphone: ${err.message}`);
    }
  };

  // Stop Recording
  const stopRecordingAudio = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false); // Set recording state to false
    }
  };

  // Stop Speech Recognition and Transcribe Text
  const stopTalking = () => {
    if (recognition) {
      recognition.stop();
      addChatMessage('You', transcript);
  
      // Analyze the sentiment of the final transcript
      analyzeSentiment(transcript);
  
      // Generate bot response based on the sentiment
      generateBotResponse(transcript);
  
      setTranscript(''); // Clear transcript for next input
    }
  };

  // End Chat
  const endChat = () => {
    setTranscript('');
    setChatHistory([]);
    setSentiment('');
    setTranslatedAudio('');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        backgroundColor: '#d1e7dd',
        borderRadius: '8px',
        padding: '20px',
        minHeight: '100vh',
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Feeling Low? Wanna Talk Bot
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" align="center">
              Speak your heart out. We'll listen!
            </Typography>
          </Box>

          {/* Error Message */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Speech Recognition */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6">Speech to Text</Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={startRecognition}
              disabled={recording}
              sx={{
                mt: 2,
                mb: 1,
                backgroundColor: '#6fbf92',
                '&:hover': {
                  backgroundColor: '#5ca482',
                },
              }}
            >
              Start Talking
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={stopTalking}
              disabled={!recording}
              sx={{
                mt: 1,
                mb: 1,
                backgroundColor: '#e57373',
                '&:hover': {
                  backgroundColor: '#ef5350',
                },
              }}
            >
              Stop Talking
            </Button>
            <Typography variant="body1">
              {transcript ? `You said: ${transcript}` : 'Click the button to start speaking.'}
            </Typography>
          </Box>

          {/* Recording Audio */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6">Record Audio</Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={startRecordingAudio}
              disabled={recording}
              sx={{
                mt: 2,
                mb: 1,
                backgroundColor: '#6fbf92',
                '&:hover': {
                  backgroundColor: '#5ca482',
                },
              }}
            >
              Start Recording
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={stopRecordingAudio}
              disabled={!mediaRecorderRef.current}
              sx={{
                mt: 1,
                mb: 1,
                backgroundColor: '#e57373',
                '&:hover': {
                  backgroundColor: '#ef5350',
                },
              }}
            >
              Stop Recording
            </Button>

            {/* Play the current recording */}
            {audioURL && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Current Recorded Audio:</Typography>
                <audio controls src={audioURL} style={{ width: '100%' }} />
              </Box>
            )}

            {/* Play the previous recording */}
            {previousAudioURL && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Previous Recorded Audio:</Typography>
                <audio controls src={previousAudioURL} style={{ width: '100%' }} />
              </Box>
            )}
          </Box>

          {/* Sentiment Analysis */}
          {sentiment && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Sentiment Detected:</Typography>
              <Typography variant="body1">{sentiment}</Typography>
            </Box>
          )}

          {/* Translated Audio */}
          {translatedAudio && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Translated Audio:</Typography>
              <audio controls src={translatedAudio} style={{ width: '100%' }} />
            </Box>
          )}

          {/* Chat History */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Chat History:</Typography>
            {chatHistory.map((chat, index) => (
              <Typography key={index}>
                <strong>{chat.sender}: </strong>{chat.message}
              </Typography>
            ))}
          </Box>

          {/* End Chat Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={endChat}
            sx={{
              mt: 3,
              backgroundColor: '#3f51b5',
              '&:hover': {
                backgroundColor: '#3e48b2',
              },
            }}
          >
            End Chat
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SpeechToTextBot;
