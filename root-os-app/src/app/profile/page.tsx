'use client';

import React from 'react';
import { User, LogOut, Shield, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StaffProfilePage() {
  return (
    <div className="p-6 space-y-8">
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-4xl font-bold">
          TM
        </div>
        <div>
          <h2 className="text-2xl font-bold">Thabo Mokoena</h2>
          <p className="text-slate-500 font-medium tracking-wide text-sm uppercase">Team Lead • GreenLawn Gardeners</p>
        </div>
      </header>

      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Settings</h3>
        <div className="space-y-2">
          <div className="bg-[#25282C] p-4 rounded-2xl flex items-center justify-between border border-slate-800">
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="font-bold">Push Notifications</span>
            </div>
            <div className="h-6 w-10 bg-primary rounded-full relative">
              <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          <div className="bg-[#25282C] p-4 rounded-2xl flex items-center justify-between border border-slate-800">
            <div className="flex items-center gap-4">
              <Shield className="w-5 h-5 text-slate-400" />
              <span className="font-bold">Security</span>
            </div>
            <Button variant="ghost" className="text-primary font-bold">Manage</Button>
          </div>
        </div>
      </section>

      <Button variant="secondary" className="w-full h-14 rounded-2xl bg-slate-800 border-none text-red-400 gap-2 font-bold">
        <LogOut className="w-5 h-5" /> Sign Out
      </Button>

      <p className="text-center text-slate-600 text-[10px] uppercase font-black tracking-widest pt-8">
        ROOTOS v1.0 • Staff Edition
      </p>
    </div>
  );
}
