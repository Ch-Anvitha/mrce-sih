import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Track Status', path: '/status' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-border py-3" 
          : "bg-white md:bg-white/80 md:backdrop-blur-sm py-4 md:py-5" 
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logos */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-3">
              <img src="/images/logos/mrce-logo.jpg" alt="MRCE Logo" className="h-10 sm:h-12 w-auto object-contain" />
              <img src="/images/logos/iic-logo.png" alt="IIC Logo" className="h-10 sm:h-12 w-auto object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm lg:text-base leading-tight text-primary transition-colors group-hover:text-accent">
                Internal Smart India
              </span>
              <span className="font-heading font-bold text-sm lg:text-base leading-tight text-accent transition-colors group-hover:text-primary">
                Hackathon 2026
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "relative px-4 py-2 font-medium text-sm transition-colors duration-200 rounded-md hover:bg-slate-100",
                  isActive 
                    ? "text-primary font-semibold" 
                    : "text-slate-600 hover:text-primary"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent mx-4 rounded-t-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right: Actions & Mobile Menu */}
        <div className="flex items-center gap-3">
          <Button 
            render={<Link to="/register" />}
            className="hidden sm:inline-flex bg-primary text-white hover:bg-accent hover:text-white transition-colors duration-300 font-medium px-6 shadow-sm hover:shadow-md"
          >
            Register Now
          </Button>
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
