import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Square } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './VoiceAssistant.css';

const VoiceAssistant = ({ text, autoPlay = false, onComplete }) => {
  const { t, currentLanguage } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const speechRef = useRef(null);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsEnabled(true);
      speechRef.current = window.speechSynthesis;
    }
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && isEnabled && text) {
      speakText(text);
    }
  }, [autoPlay, isEnabled, text]);

  const speakText = (textToSpeak) => {
    if (!isEnabled || !speechRef.current) return;

    // Stop any current speech
    stopSpeaking();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Configure voice settings
    utterance.lang = getLanguageCode(currentLanguage);
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Set up event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentUtterance(utterance);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentUtterance(null);
      if (onComplete) onComplete();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setCurrentUtterance(null);
    };

    // Start speaking
    speechRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechRef.current) {
      speechRef.current.cancel();
      setIsPlaying(false);
      setCurrentUtterance(null);
    }
  };

  const toggleSpeaking = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      speakText(text);
    }
  };

  const getLanguageCode = (language) => {
    const languageMap = {
      en: 'en-US',
      sw: 'sw-TZ',
      fr: 'fr-FR',
      ar: 'ar-SA'
    };
    return languageMap[language] || 'en-US';
  };

  if (!isEnabled) {
    return (
      <div className="voice-assistant-disabled">
        <VolumeX size={20} />
        <span>{t('audioNotSupported')}</span>
      </div>
    );
  }

  return (
    <div className="voice-assistant">
      <div className="voice-controls">
        <button
          className={`voice-btn ${isPlaying ? 'playing' : ''}`}
          onClick={toggleSpeaking}
          aria-label={isPlaying ? t('stopAudio') : t('playAudio')}
          disabled={!text}
        >
          {isPlaying ? (
            <>
              <Square size={16} />
              <span>{t('stopAudio')}</span>
            </>
          ) : (
            <>
              <Play size={16} />
              <span>{t('playAudio')}</span>
            </>
          )}
        </button>
        
        <div className="voice-status">
          {isPlaying && (
            <div className="speaking-indicator">
              <div className="pulse-dot"></div>
              <span>{t('speaking')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant; 