import React from 'react';

export default function LeaderStep({ onNext }) {
  return (
    <form id="leader-step-form" onSubmit={(e) => { e.preventDefault(); onNext?.(); }} className="space-y-8">
      
      {/* Section Header */}
      <div>
        <h3 className="text-xl font-bold text-amber-400 tracking-tight">Team Leader Details</h3>
        <p className="text-sm text-slate-400 mt-1">Enter the contact and academic details for the primary point of contact.</p>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Full Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Full Name <span className="text-amber-500">*</span>
          </label>
          <input 
            type="text" 
            placeholder="As per institutional records"
            className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
            required
          />
        </div>

        {/* Roll Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Roll Number <span className="text-amber-500">*</span>
          </label>
          <input 
            type="text" 
            placeholder="E.g., 20X41A0501"
            className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm uppercase"
            required
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Email Address <span className="text-amber-500">*</span>
          </label>
          <input 
            type="email" 
            placeholder="Primary contact email"
            className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Phone Number <span className="text-amber-500">*</span>
          </label>
          <input 
            type="tel" 
            placeholder="+91 10-digit mobile number"
            className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
            required
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Gender <span className="text-amber-500">*</span>
          </label>
          <select 
            className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
            required
          >
            <option value="" disabled selected>Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Branch */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Branch <span className="text-amber-500">*</span>
          </label>
          <select 
            className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
            required
          >
            <option value="" disabled selected>Select Branch</option>
            <option value="CSE">Computer Science & Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics & Communication</option>
            <option value="EEE">Electrical & Electronics</option>
          </select>
        </div>

        {/* Year */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Year <span className="text-amber-500">*</span>
          </label>
          <select 
            className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
            required
          >
            <option value="" disabled selected>Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        {/* Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Section <span className="text-amber-500">*</span>
          </label>
          <input 
            type="text" 
            placeholder="E.g., A"
            className="w-full bg-[#030712] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm uppercase"
            required
          />
        </div>

      </div>

      {/* Hidden submit trigger for wizard footer */}
      <button type="submit" id="leader-step-submit" className="hidden" />
    </form>
  );
}