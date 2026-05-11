'use client';

import React from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export default function PortalExpiredPage() {
  const { branding } = useTheme();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F8F9F7] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-8">
        <AlertCircle className="w-10 h-10 text-amber-600" />
      </div>
      
      <h1 className="text-3xl font-black mb-4 text-slate-900">
        Booking Temporarily Unavailable
      </h1>
      
      <p className="text-slate-600 mb-10 text-lg leading-relaxed">
        We apologize for the inconvenience. Online booking for <span className="font-bold text-slate-900">{branding.name}</span> is currently inactive. Please contact the business directly via WhatsApp or phone.
      </p>

      <div className="w-full space-y-4">
        <Button 
          variant="primary" 
          className="w-full h-16 bg-[#1D3D2F] hover:bg-[#1D3D2F]/90 text-white rounded-2xl font-bold text-lg"
          onClick={() => window.open(`https://wa.me/`, '_blank')}
        >
          Contact via WhatsApp
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full h-14 text-slate-500 font-bold flex items-center justify-center gap-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Button>
      </div>

      <footer className="mt-20">
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black">
          Powered by RootOS
        </p>
      </footer>
    </div>
  );
}
