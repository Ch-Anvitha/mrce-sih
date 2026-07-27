import React from 'react';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
        About the Event
      </h1>
      <p className="text-lg text-foreground max-w-2xl">
        Information about the Internal Smart India Hackathon 2026 will be available here soon.
      </p>
    </div>
  );
}
