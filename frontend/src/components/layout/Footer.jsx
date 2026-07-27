import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-primary/20 mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* About Event */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-bold text-accent">About Event</h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              The Internal Smart India Hackathon 2026 is a premier innovation initiative at MRCE, bringing together brilliant minds to solve real-world challenges through technology and collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-bold text-accent">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-white/80 hover:text-white hover:translate-x-1 text-sm transition-all w-fit">Home</Link>
              <Link to="/about" className="text-white/80 hover:text-white hover:translate-x-1 text-sm transition-all w-fit">About</Link>
              <Link to="/timeline" className="text-white/80 hover:text-white hover:translate-x-1 text-sm transition-all w-fit">Timeline</Link>
              <Link to="/register" className="text-white/80 hover:text-white hover:translate-x-1 text-sm transition-all w-fit">Register</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-bold text-accent">Contact</h3>
            <ul className="flex flex-col gap-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">Malla Reddy College of Engineering,<br/>Maisammaguda, Secunderabad, 500100</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:info@mrce.in" className="hover:text-white transition-colors">info@mrce.in</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+914023792146" className="hover:text-white transition-colors">+91 40 2379 2146</a>
              </li>
            </ul>
          </div>

          {/* Institution Innovation Council */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-bold text-accent">Organized By</h3>
            <div className="bg-white/10 rounded-lg p-5 w-fit border border-white/10 flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 p-1.5 overflow-hidden">
                <img src="/images/logos/iic-logo.png" alt="IIC Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-bold block text-sm text-center">Institution Innovation Council</span>
              <span className="text-white/70 block text-xs text-center mt-1">MRCE Chapter</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Malla Reddy College of Engineering. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/5">Internal SIH 2026 Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
