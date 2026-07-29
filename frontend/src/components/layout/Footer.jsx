import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030712] text-white pt-16 pb-8 border-t border-slate-800/80 relative mt-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* About Event */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-bold text-amber-400">About Event</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The Internal Smart India Hackathon 2026 is a premier innovation initiative at MRCE, bringing together brilliant minds to solve real-world challenges through technology and collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-bold text-amber-400">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-slate-400 hover:text-white hover:translate-x-1 text-sm transition-all w-fit">Home</Link>
              <Link to="/about" className="text-slate-400 hover:text-white hover:translate-x-1 text-sm transition-all w-fit">About</Link>
              <Link to="/timeline" className="text-slate-400 hover:text-white hover:translate-x-1 text-sm transition-all w-fit">Timeline</Link>
              <Link to="/register" className="text-slate-400 hover:text-white hover:translate-x-1 text-sm transition-all w-fit">Register</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-bold text-amber-400">Contact</h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">Malla Reddy College of Engineering,<br/>Maisammaguda, Secunderabad, 500100</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <a href="mailto:info@mrce.in" className="hover:text-white transition-colors">info@mrce.in</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <a href="tel:+914023792146" className="hover:text-white transition-colors">+91 40 2379 2146</a>
              </li>
            </ul>
          </div>

          {/* Institution Innovation Council */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-bold text-amber-400">Organized By</h3>
            <div className="bg-[#0B1120] rounded-xl p-5 w-fit border border-slate-800 shadow-xl flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 p-1.5 overflow-hidden">
                <img src="/images/logos/iic-logo.png" alt="IIC Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-bold block text-sm text-center">Institution Innovation Council</span>
              <span className="text-amber-400/80 block text-xs text-center mt-1">MRCE</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Malla Reddy College of Engineering. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="bg-[#0B1120] border border-slate-800 px-3 py-1 rounded-full text-xs font-semibold text-amber-400">Internal SIH 2026 Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}