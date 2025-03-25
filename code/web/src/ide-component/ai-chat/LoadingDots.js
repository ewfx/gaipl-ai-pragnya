import React from 'react';
import './LoadingDots.css';
import { Bot, Coffee } from 'lucide-react';

const LoadingDots = ({text}) => {
  return (
    <>
      <div className="loading-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      {
        text &&
        <div style={{textAlign:'center', fontFamily: 'math' }}><Bot size={25} color='rgb(143, 73, 8)' /> {text}</div>
      }
    </>
  );
};

export default LoadingDots;
