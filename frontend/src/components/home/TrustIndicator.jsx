import React from 'react';

export default function TrustIndicator({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2.5 text-white/85">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20">
        <Icon className="w-4 h-4 text-accent" />
      </div>
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </div>
  );
}
