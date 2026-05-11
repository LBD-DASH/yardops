'use client';

import React, { useEffect, useState } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { checkSubscription, SubscriptionInfo } from '@/lib/data';

export function TrialBanner() {
  const [sub, setSub] = useState<SubscriptionInfo | null>(null);

  useEffect(() => {
    checkSubscription('org-1').then(setSub); // In real app, get orgId from context/auth
  }, []);

  if (!sub || !sub.isTrial || sub.daysRemaining === null) {
    return null;
  }

  const diffDays = sub.daysRemaining;

  if (diffDays < 0) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-sm">Trial ends in {diffDays} {diffDays === 1 ? 'day' : 'days'}</p>
          <p className="text-xs text-white/80">Upgrade now to keep your professional features active.</p>
        </div>
      </div>
      <Link 
        href="/dashboard/settings/billing" 
        className="bg-white text-orange-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/90 transition-colors"
      >
        View Plans <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
