import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Track Status', path: '/track-status' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030712] backdrop-blur-md border-b border-amber-500/20 text-white shadow-lg m-0 p-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Logos & Title Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <img 
              src="/images/logos/mrce-logo.jpg" 
              alt="MRCE Logo" 
              className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" 
            />
            <img 
              src="/images/logos/iic-logo.png" 
              alt="IIC Logo" 
              className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" 
            />
          </div>

          <div className="hidden sm:block h-8 w-[1px] bg-slate-800"></div>

          <Link to="/" className="flex flex-col">
            <span className="font-heading text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
              Internal Smart India
            </span>
            <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 tracking-wider">
              Hackathon 2026
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors py-1 ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-amber-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right: Register CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Button 
            render={<Link to="/register" />} 
            className="hidden sm:inline-flex bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all rounded-xl px-6 h-10 text-sm"
          >
            Register Now
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#030712] border-b border-amber-500/20 px-6 py-6 flex flex-col gap-4 shadow-2xl backdrop-blur-xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                  isActive ? 'text-amber-400 bg-amber-500/10 font-semibold' : 'text-slate-300 hover:text-amber-300 hover:bg-slate-900'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Button 
            render={<Link to="/register" />} 
            onClick={() => setIsOpen(false)}
            className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold h-12 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            Register Now
          </Button>
        </div>
      )}
    </header>
  );
}