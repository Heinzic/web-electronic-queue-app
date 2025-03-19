import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
    <header className="bg-[#ff4c4c] text-white text-center p-4">
        <NavLink to={'/'}>
            <h1 className="text-2xl font-bold hover:text-gray-300">Вне очереди</h1>
        </NavLink>
    </header>
);
