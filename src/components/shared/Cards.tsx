import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  title: string;
  content: string;
  className?: string;
}

interface CardsProps {
  cards: CardProps[];
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, content, className }) => (
  <div className={cn(
    "card bg-white rounded-lg shadow-md p-4",
    className
  )}>
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p>{content}</p>
  </div>
);

const Cards: React.FC<CardsProps> = ({ cards, className }) => {
  return (
    <div className={cn(
      "flex justify-center items-center min-h-screen bg-gray-100",
      className
    )}>
      <div className="flex flex-wrap justify-center gap-4">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            content={card.content} 
            className={card.className}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
