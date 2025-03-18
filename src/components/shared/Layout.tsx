import React from 'react';
import { cn } from '../../lib/utils';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="flex flex-col min-h-screen h-screen bg-[#D9D9D9]">
      <Header />
      <main className={cn("flex-grow w-full flex bg-[#D9D9D9]", className)}>
        <div className="w-full p-4">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
