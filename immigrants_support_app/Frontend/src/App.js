import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Register from './Components/Register';
import Categories from './Components/Categories';
import TranslateToImage from './Components/TranslateToImage';
import { LanguageProvider } from './Components/LanguageContext'; // Import the new component
import SpeechToTextBot from './Components/SpeechToTextBot';
import { I18nextProvider } from 'react-i18next';
import i18n from './Components/i18n';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}> 
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={ <I18nextProvider i18n={i18n}><Register /> </I18nextProvider>} /> 
        <Route path="/categories" element={<Categories />} />
        <Route path="/feeling-low" element={<SpeechToTextBot />} />
        <Route path="/translate-to-image" element={    <I18nextProvider i18n={i18n}>
      <TranslateToImage />
    </I18nextProvider>} /> {/* New route */}
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect all unknown routes */}
      </Routes>
    </Router>
    </I18nextProvider>
  );
};

export default App;
