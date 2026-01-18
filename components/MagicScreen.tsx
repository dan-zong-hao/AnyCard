import React, { useState, useEffect } from 'react';
import { CardData, Quadrant, Rank } from '../types';
import { getSuitFromQuadrant, getRankFromTime } from '../utils/cardLogic';
import PlayingCard from './PlayingCard';

const MagicScreen: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [visibleCard, setVisibleCard] = useState<CardData | null>(null);
  const [lockedRank, setLockedRank] = useState<Rank | null>(null);
  
  // Vibration helper
  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(30);
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatters
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  
  // Date Formatters
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const dayOfWeek = days[time.getDay()];
  
  const year = time.getFullYear().toString().slice(-2);
  const month = (time.getMonth() + 1).toString().padStart(2, '0');
  const day = time.getDate().toString().padStart(2, '0');
  
  // Combined Format: DD/MM/YY Weekday
  const dateStr = `${day}/${month}/${year} ${dayOfWeek}`;
  
  // Handlers
  const handleLock = (rank: Rank) => {
    setLockedRank(rank);
    vibrate();
    console.log(`Locked: ${rank}`);
  };

  const handleJoker = (type: 'Big' | 'Small') => {
    setVisibleCard({ suit: 'joker', rank: type });
    setLockedRank(null);
    vibrate();
  };

  const handleQuadrantClick = (quad: Quadrant) => {
    const suit = getSuitFromQuadrant(quad);
    let rank: Rank;

    if (lockedRank) {
      rank = lockedRank;
      setLockedRank(null); 
    } else {
      rank = getRankFromTime(time.getSeconds());
    }

    setVisibleCard({ suit, rank });
    vibrate();
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => console.log(e));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Icons
  const PhoneIcon = () => (
    <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
      <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    </div>
  );

  const MessageIcon = () => (
    <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
      <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
    </div>
  );

  const MailIcon = () => (
    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
      <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    </div>
  );

  const BatteryIcon = () => (
    <svg className="w-6 h-4 text-white/70 inline-block mr-2" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 4h-2V2h-4v2H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM10 4v2h4V4h-4z"/>
      <path d="M7 11v8h10v-8H7z" fillOpacity="0.8" />
      <path d="M11.5 15.5L10 17l4-2.5-1.5-1.5 2-2.5-4 2.5z" className="text-white"/>
    </svg>
  );

  const WeatherIcon = () => (
    <svg className="w-8 h-8 text-white/70 ml-2" viewBox="0 0 24 24" fill="currentColor">
       <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z" fillOpacity="0.7"/>
    </svg>
  );

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden flex flex-col justify-center select-none font-sans">
      
      {/* 
        Quadrant Layers (Invisible Touch Zones) 
        Covering the corners for the suit selection
      */}
      <div className="absolute inset-0 z-10 grid grid-cols-2 grid-rows-2">
        <div onClick={() => handleQuadrantClick('top-left')} className="cursor-default"></div>
        <div onClick={() => handleQuadrantClick('top-right')} className="cursor-default"></div>
        <div onClick={() => handleQuadrantClick('bottom-left')} className="cursor-default"></div>
        <div onClick={() => handleQuadrantClick('bottom-right')} className="cursor-default"></div>
      </div>

      {/* 
        Content Layer - Left Aligned Layout
        Z-Index 20 to capture specific clicks on numbers/date/icons
      */}
      <div className="z-20 flex flex-col items-start pl-8 sm:pl-16 w-full max-w-lg">
        
        {/* Padding to balance removal of top date */}
        <div className="mb-4"></div>

        {/* Time Display - HH:MM:SS */}
        {/* Reduced font sizes to be cleaner */}
        <div className="flex items-baseline font-bold leading-none mb-4 -ml-1">
            
            {/* Hours -> Lock J */}
            <span 
              onClick={(e) => { e.stopPropagation(); handleLock('J'); }}
              className="text-6xl sm:text-8xl cursor-default active:text-gray-300 transition-colors"
            >
              {hours}
            </span>
            
            <span className="text-5xl sm:text-7xl text-gray-500 font-light px-1 animate-pulse mb-4">:</span>
            
            {/* Minutes -> Lock Q */}
            <span 
              onClick={(e) => { e.stopPropagation(); handleLock('Q'); }}
              className="text-6xl sm:text-8xl cursor-default active:text-gray-300 transition-colors"
            >
              {minutes}
            </span>

            <span className="text-5xl sm:text-7xl text-gray-500 font-light px-1 animate-pulse mb-4">:</span>

            {/* Seconds - Matched size and color to Minutes */}
            <div 
               onClick={(e) => { e.stopPropagation(); handleLock('K'); }}
               className="cursor-default"
            >
               <span 
                 key={seconds}
                 className="inline-block text-6xl sm:text-8xl font-bold text-white animate-flip min-w-[3rem] text-center"
               >
                 {seconds}
               </span>
            </div>
        </div>

        {/* Date Row -> Big Joker Trigger */}
        <div 
          onClick={(e) => { e.stopPropagation(); handleJoker('Big'); }}
          className="text-3xl sm:text-4xl text-white font-serif tracking-wide flex items-center gap-4 mb-4 w-fit"
        >
           {dateStr}
        </div>

        {/* 
           Bottom Section Wrapper
           Includes Weather, Battery, Icons
        */}
        <div 
           className="flex flex-col gap-4 w-full cursor-default pt-2 pb-10"
        >
            {/* Weather Row */}
            <div className="flex items-center text-4xl sm:text-5xl font-light text-gray-200">
               <span>-6°</span>
               <WeatherIcon />
            </div>

            {/* Battery Row */}
            <div className="flex items-center text-lg sm:text-xl text-gray-400 font-medium tracking-wide">
              <BatteryIcon />
              <span>48%</span>
            </div>

            {/* Notification Icons Row -> Small Joker Trigger */}
            <div 
              onClick={(e) => { e.stopPropagation(); handleJoker('Small'); }}
              className="flex items-center gap-4 mt-2 cursor-pointer w-fit"
            >
              <PhoneIcon />
              <MessageIcon />
              <MailIcon />
            </div>
        </div>

      </div>

      {/* Fullscreen Trigger (Hidden pixel) */}
      <div 
        className="absolute bottom-0 right-0 w-8 h-8 z-50 opacity-0 hover:opacity-100 flex items-center justify-center text-gray-500 cursor-pointer"
        onClick={toggleFullScreen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </div>

      {/* Card Overlay */}
      {visibleCard && (
        <PlayingCard 
          card={visibleCard} 
          onClick={() => setVisibleCard(null)} 
        />
      )}

    </div>
  );
};

export default MagicScreen;