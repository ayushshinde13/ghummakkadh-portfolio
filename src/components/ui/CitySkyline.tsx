import React from 'react';

export const CitySkyline: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="w-full h-full block"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base line */}
        <rect x="0" y="115" width="1200" height="5" />
        
        {/* Left: Box with small box on top */}
        <path d="M0,120 L0,80 L40,80 L40,60 L65,60 L65,80 L105,80 L105,120 Z" />
        
        {/* Arch 1 */}
        <path d="M125,120 L125,45 A 40 40 0 0 1 205 45 L205,120 Z" />
        
        {/* Pointed Roof 1 */}
        <path d="M225,120 L225,70 L255,70 L255,40 L275,20 L295,40 L295,70 L325,70 L325,120 Z" />
        
        {/* Arch 2 */}
        <path d="M350,120 L350,60 A 30 30 0 0 1 410 60 L410,120 Z" />
        
        {/* Arch 3 */}
        <path d="M500,120 L500,75 A 25 25 0 0 1 550 75 L550,120 Z" />
        
        {/* Flat/Box */}
        <path d="M600,120 L600,90 L670,90 L670,120 Z" />
        
        {/* Arch 4 */}
        <path d="M720,120 L720,40 A 35 35 0 0 1 790 40 L790,120 Z" />
        
        {/* Pointed Roof 2 */}
        <path d="M830,120 L830,60 L850,40 L870,60 L870,120 Z" />
        
        {/* Tall Arch 5 */}
        <path d="M910,120 L910,30 A 45 45 0 0 1 1000 30 L1000,120 Z" />
        
        {/* Pointed Roof 3 */}
        <path d="M1030,120 L1030,80 L1060,80 L1060,50 L1080,30 L1100,50 L1100,80 L1130,80 L1130,120 Z" />
        
        {/* Final Small Box */}
        <path d="M1160,120 L1160,95 L1200,95 L1200,120 Z" />
      </svg>
    </div>
  );
};
