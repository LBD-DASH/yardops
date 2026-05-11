'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/components/theme-provider';
import { CheckCircle2, ChevronRight, Calendar, Clock, MapPin, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function CustomerPortal() {
  const { branding } = useTheme();
  const [step, setStep] = useState<'catalog' | 'details' | 'success'>('catalog');
  const [selectedService, setSelectedService] = useState<any>(null);

  // Aligned with Supabase 'services' table schema
  const services = [
    { id: '1', name: 'Lawn Mowing', base_price: 250, unit: 'visit', icon: '🌿' },
    { id: '2', name: 'Hedge Trimming', base_price: 450, unit: 'hour', icon: '🌳' },
    { id: '3', name: 'Garden Tidy-Up', base_price: 600, unit: 'visit', icon: '🍂' },
  ];

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#F8F9F7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Booking Received!</h1>
        <p className="text-slate-600 mb-8">
          We&apos;ve sent a confirmation message to your WhatsApp. {branding.name} will be in touch shortly.
        </p>
        <Button variant="primary" className="w-full h-14 text-lg font-bold" onClick={() => setStep('catalog')}>
          Done
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F8F9F7] flex flex-col shadow-2xl overflow-hidden rounded-[2.5rem] border-[8px] border-white my-4">
      {/* Dynamic Header based on step */}
      <main className="flex-1 flex flex-col">
        {step === 'catalog' ? (
          <div className="flex flex-col h-full">
            <div 
              className="h-64 bg-cover bg-center rounded-b-[2rem] relative"
              style={{ backgroundImage: 'url("/garden-hero.png")' }}
            >
              <div className="absolute inset-0 bg-black/10" />
            </div>
            
            <div className="px-8 pt-8 pb-12 flex flex-col flex-1">
              <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center leading-tight">
                Garden Services
              </h1>

              <div className="space-y-4 flex-1">
                {services.map((service) => (
                  <div 
                    key={service.id} 
                    className={cn(
                      "bg-white p-6 rounded-2xl flex items-center justify-between shadow-sm transition-all border-2",
                      selectedService?.id === service.id ? "border-primary ring-1 ring-primary" : "border-transparent"
                    )}
                    onClick={() => setSelectedService(service)}
                  >
                    <span className="text-xl font-bold text-slate-800">{service.name}</span>
                    <span className="text-xl font-bold text-slate-800">R {service.base_price}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Button 
                  variant="primary" 
                  className="w-full h-20 text-2xl font-bold rounded-2xl bg-[#1D3D2F] hover:bg-[#1D3D2F]/90"
                  disabled={!selectedService}
                  onClick={() => setStep('details')}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <header className="flex items-center gap-4 mb-6">
               <div 
                 className="h-10 w-10 rounded-full flex items-center justify-center text-primary-foreground font-bold cursor-pointer bg-primary"
                 onClick={() => setStep('catalog')}
               >
                 ←
               </div>
               <h2 className="text-2xl font-bold">Your Details</h2>
             </header>
            
            <section className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-500 uppercase text-[10px] font-bold tracking-widest">Full Name</Label>
                <Input className="h-14 rounded-xl border-slate-200" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500 uppercase text-[10px] font-bold tracking-widest">WhatsApp Number</Label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-sm font-bold text-slate-400">+27</div>
                  <Input className="h-14 rounded-xl border-slate-200 pl-14" placeholder="82 123 4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-500 uppercase text-[10px] font-bold tracking-widest">Service Address</Label>
                <Input className="h-14 rounded-xl border-slate-200" placeholder="123 Garden Route" />
              </div>
            </section>

            <section className="space-y-4 pt-4">
              <h3 className="font-bold">Preferred Time</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="secondary" className="h-14 rounded-xl bg-white border-slate-200 text-slate-600 font-bold">
                  Select Date
                </Button>
                <Button variant="secondary" className="h-14 rounded-xl bg-white border-slate-200 text-slate-600 font-bold">
                  Select Time
                </Button>
              </div>
            </section>

            <div className="pt-8">
              <Button 
                variant="cta" 
                className="w-full h-20 text-2xl font-bold rounded-2xl shadow-xl"
                onClick={() => setStep('success')}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="p-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black">
          Powered by RootOS
        </p>
      </footer>
    </div>
  );
}
