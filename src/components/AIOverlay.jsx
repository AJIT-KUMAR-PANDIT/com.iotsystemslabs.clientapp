import React, { useState, useEffect } from 'react';
import '../styles/ai-overlay.css';

const AIOverlay = ({ isOpen, onClose, onListen, isListening }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [audioVisualizer, setAudioVisualizer] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Reset animation state
      setAnimationComplete(false);
      
      // Trigger animation completion after delay
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isListening) {
      // Simulate audio visualization
      const interval = setInterval(() => {
        const bars = Array.from({ length: 20 }, () => 
          Math.floor(Math.random() * 100)
        );
        setAudioVisualizer(bars);
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      setAudioVisualizer([]);
    }
  }, [isListening]);

  if (!isOpen) return null;

  return (
    <div className="ai-overlay">
      <div className="ai-overlay-background"></div>
      
      <div className="ai-overlay-content">
        <button className="ai-close-button" onClick={onClose}>
          <span>×</span>
        </button>
        
        <div className="ai-circle-container">
          <div className="ai-outer-circle"></div>
          <div className="ai-middle-circle"></div>
          <div className="ai-inner-circle"></div>
          
          <div className="ai-core">
            <div className={`ai-core-pulse ${isListening ? 'pulse-active' : ''}`}></div>
          </div>
          
          {animationComplete && (
            <div className="ai-status-text">
              {isListening ? "Listening..." : "Ready"}
            </div>
          )}
        </div>
        
        <div className="ai-visualizer-container">
          {audioVisualizer.map((height, index) => (
            <div 
              key={index} 
              className="ai-visualizer-bar"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
        
        <button 
          className={`ai-action-button ${isListening ? 'listening' : ''}`}
          onClick={onListen}
        >
          {isListening ? "Stop" : "Listen"}
        </button>
        
        <div className="ai-tech-elements">
          <div className="ai-tech-circle top-left"></div>
          <div className="ai-tech-circle top-right"></div>
          <div className="ai-tech-circle bottom-left"></div>
          <div className="ai-tech-circle bottom-right"></div>
          <div className="ai-tech-line horizontal"></div>
          <div className="ai-tech-line vertical"></div>
        </div>
      </div>
    </div>
  );
};

export default AIOverlay;