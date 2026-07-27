import React from 'react';

export default function Timeline() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
        Event Timeline
      </h1>
      <p className="text-lg text-foreground max-w-2xl">
        The detailed schedule for the hackathon is being finalized.
      </p>
    </div>
  );
}
