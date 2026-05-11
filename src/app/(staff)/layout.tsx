'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Map, 
  User,
  LogOut,
  Lock,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { checkSubscription, SubscriptionInfo, isFeatureEnabled } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sub, setSub] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscription('org-1').then(res => {
      setSub(res);
      setLoading(false);
    });
  }, []);

  const staffViewEnabled = isFeatureEnabled(sub, 'staff_view');

  const navItems = [
    { title: 'Jobs', icon: Calendar, href: '/schedule' },
    { title: 'Profile', icon: User, href: '/profile' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1C1E] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!staffViewEnabled) {
    return (
      <div className="min-h-screen bg-[#1A1C1E] text-white flex flex-col items-center justify-center p-8 text-center">
        <div className="h-20 w-20 bg-amber-500/10 rounded-[2rem] flex items-center justify-center text-amber-500 mb-8">
          <Lock className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black mb-4">Staff Mobile View is a Premium Feature</h2>
        <p className="text-slate-400 mb-10 max-w-xs mx-auto">
          Empower your team in the field with the Staff Mobile View. Upgrade to Professional to unlock this feature.
        </p>
        <Link href="/dashboard/settings/billing" className="w-full max-w-xs">
          <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/20">
            Upgrade to Pro <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
        <p className="mt-8 text-slate-600 text-xs font-bold uppercase tracking-widest">Powered by RootOS</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1C1E] text-white flex flex-col">
      {/* Top Header */}
      <header className="h-16 bg-[#121416] border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-50">
        <h1 className="text-xl font-bold text-primary">RootOS <span className="text-white font-normal text-sm ml-2">Staff</span></h1>
        <button className="text-slate-400 hover:text-white">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24">
        {children}
      </main>

      {/* Bottom Navigation (Mobile-first) */}
      <nav className="h-20 bg-[#121416] border-t border-slate-800 flex items-center justify-around fixed bottom-0 left-0 right-0 z-50 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.title}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-primary" : "text-slate-500"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
