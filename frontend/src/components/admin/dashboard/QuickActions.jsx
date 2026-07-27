import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Download, Megaphone, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function QuickActions() {
  const navigate = useNavigate();
  
  const handlePlaceholder = (feature) => {
    toast.info(`${feature} feature is coming soon.`);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 content-start">
        <Button 
          variant="outline" 
          className="h-14 justify-start gap-3 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 font-semibold"
          onClick={() => navigate('/admin/registrations')}
        >
          <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          Manage Registrations
        </Button>

        <Button 
          variant="outline" 
          className="h-14 justify-start gap-3 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 font-semibold"
          onClick={() => handlePlaceholder('Export')}
        >
          <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Download className="w-4 h-4" />
          </div>
          Export Data
        </Button>

        <Button 
          variant="outline" 
          className="h-14 justify-start gap-3 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 font-semibold"
          onClick={() => handlePlaceholder('Announcements')}
        >
          <div className="w-8 h-8 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Megaphone className="w-4 h-4" />
          </div>
          Announcements
        </Button>

        <Button 
          variant="outline" 
          className="h-14 justify-start gap-3 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 font-semibold"
          onClick={() => handlePlaceholder('Gallery')}
        >
          <div className="w-8 h-8 rounded-md bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
            <ImageIcon className="w-4 h-4" />
          </div>
          Update Gallery
        </Button>
      </div>
    </div>
  );
}
