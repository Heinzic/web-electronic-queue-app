import React from 'react';
import { cn } from '../../lib/utils';
import { Card } from './Card';
import { CardProps } from '../../types/CardProps';

interface CardsProps {
  cards: CardProps[];
  className?: string;
}

const Cards: React.FC<CardsProps> = ({ cards, className }) => {
  return (
    <div className="flex-grow h-full flex bg-[#D9D9D9] justify-center">
      <div className={cn(
      "flex justify-center items-center",
      className
    )}>
      <div className="flex flex-wrap justify-center gap-[30px] items-center">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            link={card.link}
            className={card.className}
          />
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default Cards;

