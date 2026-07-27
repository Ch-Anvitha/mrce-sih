import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Track Status', path: '/status' },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden text-primary hover:bg-slate-100" />}>
        <Menu className="w-6 h-6" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Mobile navigation menu for the hackathon portal.
        </SheetDescription>
        <div className="flex flex-col gap-6 py-6 h-full">
          <div className="flex items-center gap-3 px-2">
            <span className="font-heading font-bold text-xl text-primary leading-tight">
              Internal Smart India<br />Hackathon 2026
            </span>
          </div>
          <nav className="flex flex-col gap-1 mt-4 flex-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-3 text-lg font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'text-primary bg-primary/5 font-semibold' 
                      : 'text-slate-600 hover:text-accent hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto px-2">
            <Button render={<Link to="/register" />} className="w-full h-12 text-lg bg-primary hover:bg-accent text-white transition-colors" variant="default">
              Register Now
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
