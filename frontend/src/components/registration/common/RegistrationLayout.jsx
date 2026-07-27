import React from 'react';

export default function RegistrationLayout({ children, title, subtitle }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
}
