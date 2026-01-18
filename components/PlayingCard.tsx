import React from 'react';
import { CardData, Suit } from '../types';

interface PlayingCardProps {
  card: CardData;
  onClick: () => void;
}

const PlayingCard: React.FC<PlayingCardProps> = ({ card, onClick }) => {
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds' || (card.suit === 'joker' && card.rank === 'Big');
  const isJoker = card.suit === 'joker';
  const isFace = ['J', 'Q', 'K'].includes(card.rank);

  // Icons
  const SpadesIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12,22 C12,22 4,16 4,10 C4,5 8,3 12,9 C16,3 20,5 20,10 C20,16 12,22 12,22 Z M12,14 L12,22" transform="scale(1, -1) translate(0, -24)"/>
      <path d="M12 2C15 2 17 4 17 7C17 10 14 12 12 14C10 12 7 10 7 7C7 4 9 2 12 2Z" />
      <path d="M11 14H13V22H11V14Z" />
    </svg>
  );

  // Simple SVG paths for suits
  const SuitIcon = ({ suit, className }: { suit: Suit, className?: string }) => {
    if (suit === 'spades') return <div className={className}>♠</div>;
    if (suit === 'hearts') return <div className={className}>♥</div>;
    if (suit === 'clubs') return <div className={className}>♣</div>;
    if (suit === 'diamonds') return <div className={className}>♦</div>;
    return null;
  };

  const CrownIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 mb-4 text-yellow-600 drop-shadow-md">
      <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
    </svg>
  );

  const JokerContent = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className={`text-6xl font-serif font-bold ${card.rank === 'Big' ? 'text-red-600' : 'text-black'}`}>
        JOKER
      </div>
      <div className="text-9xl mt-4">
        {card.rank === 'Big' ? '👹' : '🃏'}
      </div>
      <div className="mt-8 font-serif italic text-2xl text-gray-500">
        {card.rank === 'Big' ? 'The Big One' : 'The Little One'}
      </div>
    </div>
  );

  const FaceContent = () => (
    <div className="flex flex-col items-center justify-center h-full border-4 border-double border-yellow-600/30 m-8 rounded-lg bg-gray-50/50">
      <CrownIcon />
      <div className="text-9xl gold-text font-serif font-bold drop-shadow-lg">
        {card.rank}
      </div>
      <div className={`text-6xl mt-4 ${isRed ? 'text-red-600' : 'text-black'}`}>
        <SuitIcon suit={card.suit} />
      </div>
    </div>
  );

  const NumberContent = () => (
    <div className="flex flex-col items-center justify-center h-full relative">
       {/* Center Big Suit */}
      <div className={`text-[12rem] opacity-20 absolute pointer-events-none ${isRed ? 'text-red-500' : 'text-black'}`}>
        <SuitIcon suit={card.suit} />
      </div>
      
      {/* Grid for pips - simplified for this demo to a pattern */}
      <div className={`grid grid-cols-2 gap-4 text-6xl ${isRed ? 'text-red-600' : 'text-black'}`}>
         {/* Minimal representation: just show Rank and Suit large in center */}
         <div className="flex flex-col items-center">
            <span className="text-8xl font-bold">{card.rank}</span>
            <span className="text-8xl mt-2"><SuitIcon suit={card.suit} /></span>
         </div>
      </div>
    </div>
  );

  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
    >
      <div 
        className="relative bg-white w-full max-w-[350px] aspect-[2.5/3.5] rounded-2xl shadow-2xl animate-pop-in overflow-hidden border-8 border-white ring-1 ring-gray-300 select-none cursor-pointer"
        style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Top Left Corner */}
        {!isJoker && (
          <div className="absolute top-2 left-3 flex flex-col items-center">
            <span className={`text-4xl font-bold font-serif ${isRed ? 'text-red-600' : 'text-black'}`}>{card.rank}</span>
            <span className={`text-3xl ${isRed ? 'text-red-600' : 'text-black'}`}>
              <SuitIcon suit={card.suit} />
            </span>
          </div>
        )}

        {/* Bottom Right Corner (Rotated) */}
        {!isJoker && (
          <div className="absolute bottom-2 right-3 flex flex-col items-center transform rotate-180">
            <span className={`text-4xl font-bold font-serif ${isRed ? 'text-red-600' : 'text-black'}`}>{card.rank}</span>
            <span className={`text-3xl ${isRed ? 'text-red-600' : 'text-black'}`}>
              <SuitIcon suit={card.suit} />
            </span>
          </div>
        )}

        {/* Main Content */}
        {isJoker ? <JokerContent /> : isFace ? <FaceContent /> : <NumberContent />}

      </div>
    </div>
  );
};

export default PlayingCard;