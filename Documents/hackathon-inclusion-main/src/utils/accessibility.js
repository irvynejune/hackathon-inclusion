// Accessibility and Safety Utilities for HEVA Inclusion Platform

// Voice Recognition Setup
export class VoiceAssistant {
  constructor(language = 'en-US') {
    this.recognition = null;
    this.isListening = false;
    this.language = language;
    this.onResult = null;
    this.onError = null;
    this.init();
  }

  init() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.language;

      this.recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        if (this.onResult) {
          this.onResult(transcript);
        }
      };

      this.recognition.onerror = (event) => {
        if (this.onError) {
          this.onError(event.error);
        }
      };
    }
  }

  start() {
    if (this.recognition && !this.isListening) {
      this.recognition.start();
      this.isListening = true;
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  setLanguage(language) {
    this.language = language;
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }
}

// Keyboard Navigation Manager
export class KeyboardManager {
  constructor() {
    this.shortcuts = new Map();
    this.isEnabled = true;
  }

  registerShortcut(key, callback, description = '') {
    this.shortcuts.set(key, { callback, description });
  }

  unregisterShortcut(key) {
    this.shortcuts.delete(key);
  }

  handleKeyPress(event) {
    if (!this.isEnabled) return;

    const key = this.getKeyString(event);
    const shortcut = this.shortcuts.get(key);
    
    if (shortcut) {
      event.preventDefault();
      shortcut.callback(event);
    }
  }

  getKeyString(event) {
    const modifiers = [];
    if (event.ctrlKey) modifiers.push('Ctrl');
    if (event.altKey) modifiers.push('Alt');
    if (event.shiftKey) modifiers.push('Shift');
    if (event.metaKey) modifiers.push('Meta');
    
    return [...modifiers, event.key].join('+');
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }
}

// Security and Privacy Manager
export class SecurityManager {
  constructor() {
    this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
    this.lastActivity = Date.now();
    this.secureSession = false;
    this.onSessionExpired = null;
    this.activityCheckInterval = null;
  }

  startSession() {
    this.secureSession = true;
    this.lastActivity = Date.now();
    this.startActivityMonitoring();
  }

  endSession() {
    this.secureSession = false;
    this.stopActivityMonitoring();
    this.clearSensitiveData();
  }

  updateActivity() {
    this.lastActivity = Date.now();
  }

  startActivityMonitoring() {
    this.activityCheckInterval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - this.lastActivity;
      
      if (timeDiff > this.sessionTimeout && this.secureSession) {
        this.endSession();
        if (this.onSessionExpired) {
          this.onSessionExpired();
        }
      }
    }, 60000); // Check every minute
  }

  stopActivityMonitoring() {
    if (this.activityCheckInterval) {
      clearInterval(this.activityCheckInterval);
      this.activityCheckInterval = null;
    }
  }

  clearSensitiveData() {
    // Clear sensitive data from localStorage
    const sensitiveKeys = ['userData', 'sessionToken', 'authToken'];
    sensitiveKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear sessionStorage
    sessionStorage.clear();
  }

  emergencyExit() {
    this.clearSensitiveData();
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to safe page
    window.location.href = 'https://www.google.com';
  }

  setSessionTimeout(minutes) {
    this.sessionTimeout = minutes * 60 * 1000;
  }

  getTimeRemaining() {
    const now = Date.now();
    const timeDiff = this.sessionTimeout - (now - this.lastActivity);
    return Math.max(0, Math.floor(timeDiff / 60000)); // Return minutes
  }
}

// Accessibility Features Manager
export class AccessibilityManager {
  constructor() {
    this.features = {
      highContrast: false,
      reducedMotion: false,
      largeText: false,
      screenReader: false,
      keyboardOnly: false
    };
    this.onFeatureChange = null;
  }

  toggleFeature(feature) {
    if (this.features.hasOwnProperty(feature)) {
      this.features[feature] = !this.features[feature];
      this.applyFeature(feature);
      
      if (this.onFeatureChange) {
        this.onFeatureChange(feature, this.features[feature]);
      }
    }
  }

  setFeature(feature, value) {
    if (this.features.hasOwnProperty(feature)) {
      this.features[feature] = value;
      this.applyFeature(feature);
      
      if (this.onFeatureChange) {
        this.onFeatureChange(feature, value);
      }
    }
  }

  applyFeature(feature) {
    const body = document.body;
    
    switch (feature) {
      case 'highContrast':
        body.classList.toggle('high-contrast', this.features.highContrast);
        break;
      case 'reducedMotion':
        body.classList.toggle('reduced-motion', this.features.reducedMotion);
        break;
      case 'largeText':
        body.classList.toggle('large-text', this.features.largeText);
        break;
      case 'screenReader':
        body.classList.toggle('screen-reader-mode', this.features.screenReader);
        break;
      case 'keyboardOnly':
        body.classList.toggle('keyboard-only', this.features.keyboardOnly);
        break;
    }
  }

  setFontSize(size) {
    const body = document.body;
    body.className = body.className.replace(/font-size-\w+/g, '');
    body.classList.add(`font-size-${size}`);
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Focus Management
export class FocusManager {
  constructor() {
    this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.focusHistory = [];
  }

  trapFocus(container) {
    const focusableElements = container.querySelectorAll(this.focusableElements);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  saveFocus() {
    this.focusHistory.push(document.activeElement);
  }

  restoreFocus() {
    if (this.focusHistory.length > 0) {
      const element = this.focusHistory.pop();
      if (element && element.focus) {
        element.focus();
      }
    }
  }

  focusFirstElement(container) {
    const firstElement = container.querySelector(this.focusableElements);
    if (firstElement) {
      firstElement.focus();
    }
  }
}

// Color Contrast Calculator
export class ContrastCalculator {
  static calculateContrastRatio(color1, color2) {
    const luminance1 = this.getLuminance(color1);
    const luminance2 = this.getLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  static getLuminance(color) {
    const rgb = this.hexToRgb(color);
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static isAccessible(contrastRatio) {
    return contrastRatio >= 4.5; // WCAG AA standard
  }
}

// Audio Manager for Accessibility
export class AudioManager {
  constructor() {
    this.audioContext = null;
    this.isEnabled = false;
  }

  init() {
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playTone(frequency = 440, duration = 200) {
    if (!this.audioContext || !this.isEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  playSuccess() {
    this.playTone(800, 100);
    setTimeout(() => this.playTone(1000, 100), 100);
  }

  playError() {
    this.playTone(200, 300);
  }

  playWarning() {
    this.playTone(400, 200);
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }
}

// Utility Functions
export const accessibilityUtils = {
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Check if user prefers high contrast
  prefersHighContrast: () => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Check if user prefers dark color scheme
  prefersDarkScheme: () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  },

  // Generate accessible color combinations
  generateAccessibleColors: (baseColor) => {
    const colors = [];
    const baseRgb = ContrastCalculator.hexToRgb(baseColor);
    
    if (baseRgb) {
      // Generate variations
      for (let i = 0; i < 10; i++) {
        const r = Math.max(0, Math.min(255, baseRgb.r + (i - 5) * 20));
        const g = Math.max(0, Math.min(255, baseRgb.g + (i - 5) * 20));
        const b = Math.max(0, Math.min(255, baseRgb.b + (i - 5) * 20));
        
        colors.push(`rgb(${r}, ${g}, ${b})`);
      }
    }
    
    return colors;
  },

  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for performance
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Export default instances
export const voiceAssistant = new VoiceAssistant();
export const keyboardManager = new KeyboardManager();
export const securityManager = new SecurityManager();
export const accessibilityManager = new AccessibilityManager();
export const focusManager = new FocusManager();
export const audioManager = new AudioManager();

// Initialize audio manager
audioManager.init();

// Set up global keyboard listener
document.addEventListener('keydown', (e) => {
  keyboardManager.handleKeyPress(e);
});

// Set up activity tracking for security
const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
activityEvents.forEach(event => {
  document.addEventListener(event, () => {
    securityManager.updateActivity();
  }, true);
}); 