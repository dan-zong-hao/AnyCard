export type Suit = 'spades' | 'hearts' | 'clubs' | 'diamonds' | 'joker';

export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'Big' | 'Small';

export interface CardData {
  suit: Suit;
  rank: Rank;
}

export type Quadrant = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';