import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  title: string;
  className?: string;
}
export const Card: React.FC<CardProps> = ({ title, className }) => (
  <div className={cn(
    "bg-white rounded-[76px] shadow-md p-4 flex flex-col justify-between w-[457px] h-[700px] my-auto",
    className
  )}>
    <h2 className="text-[40px] m-auto">{title}</h2>
  </div>
);

