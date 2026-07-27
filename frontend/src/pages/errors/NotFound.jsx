import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-8xl font-mono font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-heading font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg text-foreground max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button render={<Link to="/" />}>
        Return to Homepage
      </Button>
    </div>
  );
}
