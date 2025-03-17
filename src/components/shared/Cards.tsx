import React from 'react';
import { cn } from '../../lib/utils';
import { Card } from './Card';

export interface CardProps {
  title: string;
  className?: string;
}

interface CardsProps {
  cards: CardProps[];
  className?: string;
}

const Cards: React.FC<CardsProps> = ({ cards, className }) => {
  return (
    <div className={cn(
      "flex justify-center items-center",
      className
    )}>
      <div className="flex flex-wrap justify-center gap-[30px]">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            className={card.className}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;

