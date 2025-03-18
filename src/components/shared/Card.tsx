import React from 'react';
import { cn } from '../../lib/utils';
import { NavLink } from 'react-router-dom';
import { CardProps } from '../../types/CardProps';

export const Card: React.FC<CardProps> = ({ title, className, link }) => (
  <NavLink to={link}>
    <div className={cn(
    "bg-white rounded-[76px] shadow-md p-4 flex flex-col justify-between w-[457px] h-[700px] my-auto hover:bg-[#ff4c4c99] cursor-pointer hover:text-white",
    className
    )}>
      <h2 className="text-[40px] m-auto">{title}</h2>
    </div>
  </NavLink>
  
);

