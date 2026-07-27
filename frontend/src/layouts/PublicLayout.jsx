import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import BackToTop from '@/components/layout/BackToTop';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-accent/20 selection:text-primary">
      <ScrollProgress />
      <Navbar />
      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-[72px] md:h-[84px]" aria-hidden="true"></div> 
      <main className="flex-1 flex flex-col w-full bg-section">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
