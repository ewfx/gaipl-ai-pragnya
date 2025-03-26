import React from 'react';
import './LoadingDots.css';
import { Bot, Coffee } from 'lucide-react';
import Lottie from 'lottie-react';

import loadinAnim from '../img/loading.json'

const LoadingDots = ({text}) => {
  return (
    <>
      {/* <div className="loading-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div> */}
      {
        text &&
        <div style={{textAlign:'center', alignItems:'center', justifyContent: "center", fontFamily: 'math', display:"flex", flexDirection:"row"}}><Lottie className="loading-animation" animationData={loadinAnim}/>{text}</div>
      }
    </>
  );
};

export default LoadingDots;
