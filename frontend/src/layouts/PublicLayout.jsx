import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Dark Navbar */}
      <Navbar />

      {/* Main Page Content Container */}
      <main className="flex-grow bg-[#030712] text-slate-100 relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.4) 1.5px, transparent 1.5px)`,
            backgroundSize: '36px 36px'
          }}
        ></div>
        
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}