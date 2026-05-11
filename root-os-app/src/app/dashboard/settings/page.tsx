'use client';

import React from 'react';
import { CreditCard, Bell, Shield, Palette, ChevronRight, User } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const settingsSections = [
    {
      title: 'Business Profile',
      description: 'Manage your business details and logo.',
      icon: User,
      href: '/dashboard/settings/profile'
    },
    {
      title: 'Branding',
      description: 'Customize colors and fonts for your portal.',
      icon: Palette,
      href: '/dashboard/settings/branding'
    },
    {
      title: 'Billing & Plans',
      description: 'Manage your subscription and invoices.',
      icon: CreditCard,
      href: '/dashboard/settings/billing',
      highlight: true
    },
    {
      title: 'Notifications',
      description: 'Configure WhatsApp and email alerts.',
      icon: Bell,
      href: '/dashboard/settings/notifications'
    },
    {
      title: 'Security',
      description: 'Update password and manage access.',
      icon: Shield,
      href: '/dashboard/settings/security'
    }
  ];

  return (
    <main className="p-6 lg:p-12 max-w-4xl">
      <header className="mb-12">
        <h2 className="text-4xl font-bold mb-2">Settings</h2>
        <p className="text-slate-500 font-medium">Configure your digital business-in-a-box.</p>
      </header>

      <div className="space-y-4">
        {settingsSections.map((section) => (
          <Link 
            key={section.title} 
            href={section.href}
            className="block group"
          >
            <div className="bg-[#25282C] p-6 rounded-[2rem] border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <section.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    {section.title}
                    {section.highlight && (
                      <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">New</span>
                    )}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium">{section.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
