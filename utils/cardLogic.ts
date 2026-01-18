import { CardData, Quadrant, Rank, Suit } from '../types';

export const getSuitFromQuadrant = (quadrant: Quadrant): Suit => {
  switch (quadrant) {
    case 'top-left': return 'spades';
    case 'top-right': return 'hearts';
    case 'bottom-left': return 'clubs';
    case 'bottom-right': return 'diamonds';
  }
};

export const getRankFromTime = (seconds: number): Rank => {
  const lastDigit = seconds % 10;
  
  if (lastDigit === 1) return 'A';
  if (lastDigit === 0) return '10';
  if (lastDigit === 2) return '2';
  if (lastDigit === 3) return '3';
  if (lastDigit === 4) return '4';
  if (lastDigit === 5) return '5';
  if (lastDigit === 6) return '6';
  if (lastDigit === 7) return '7';
  if (lastDigit === 8) return '8';
  if (lastDigit === 9) return '9';
  
  return 'A'; // Fallback
};