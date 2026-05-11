'use client';

import React from 'react';
import { X, Lock, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export function UpgradeModal({ isOpen, onClose, featureName }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#25282C] w-full max-w-lg rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="h-14 w-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
              <Lock className="w-7 h-7" />
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <h2 className="text-3xl font-black mb-4 leading-tight">
            Unlock {featureName} with RootOS Pro
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            This feature is available on our Professional and Enterprise plans. Upgrade today to streamline your workflow.
          </p>

          <div className="space-y-4 mb-10">
            {[
              'Unlimited WhatsApp notifications',
              'Full Staff Mobile View access',
              'Advanced invoice automation',
              'Priority customer support'
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-slate-300 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
             <Button 
               variant="ghost" 
               className="h-14 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-white font-bold"
               onClick={onClose}
             >
               Maybe Later
             </Button>
             <Link href="/dashboard/settings/billing" className="w-full">
               <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                 Upgrade Now <ArrowRight className="w-4 h-4" />
               </Button>
             </Link>
          </div>
        </div>
        
        <div className="bg-primary/5 p-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
            Trusted by 500+ Garden Services
          </p>
        </div>
      </div>
    </div>
  );
}
