import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2, Play, Pause } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import './StoryViewer.css';

const StoryViewer = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useUser();

  const mockStories = [
    {
      id: 1,
      title: "My Journey as a Creative",
      author: "Sarah Mwangi",
      content: "I started my creative journey with nothing but a dream...",
      media: "image",
      likes: 45,
      comments: 12,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Breaking Barriers",
      author: "John Doe",
      content: "Through HEVA's support, I was able to...",
      media: "audio",
      likes: 32,
      comments: 8,
      date: "2024-01-14"
    }
  ];

  return (
    <div className="story-viewer">
      <header className="story-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/heva/dashboard')}
          aria-label={t('back')}
        >
          <ArrowLeft />
          {t('back')}
        </button>
        <h1>{t('storyViewer')}</h1>
      </header>

      <main className="story-content">
        <div className="stories-grid">
          {mockStories.map(story => (
            <div key={story.id} className="story-card">
              <div className="story-header">
                <h3>{story.title}</h3>
                <span className="author">by {story.author}</span>
              </div>
              
              <div className="story-body">
                <p>{story.content}</p>
                {story.media === 'audio' && (
                  <div className="audio-player">
                    <button className="play-btn" aria-label="Play audio">
                      <Play />
                    </button>
                    <span>Audio Story</span>
                  </div>
                )}
              </div>

              <div className="story-actions">
                <button className="action-btn" aria-label="Like story">
                  <Heart />
                  <span>{story.likes}</span>
                </button>
                <button className="action-btn" aria-label="Comment on story">
                  <MessageCircle />
                  <span>{story.comments}</span>
                </button>
                <button className="action-btn" aria-label="Share story">
                  <Share2 />
                </button>
              </div>

              <div className="story-meta">
                <span className="date">{story.date}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StoryViewer; 