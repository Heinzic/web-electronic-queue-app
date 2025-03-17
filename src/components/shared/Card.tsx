import React from 'react';
import { cn } from '../../lib/utils';
import { CardProps } from './Cards';

export const Card: React.FC<CardProps> = ({ title, className }) => (
  <div className={cn(
    "card bg-gray-500 rounded-lg shadow-md p-4 h-[300px] text-center",
    className
  )}>
    <h2 className="text-xl font-bold mb-2">{title}</h2>
  </div>
);
