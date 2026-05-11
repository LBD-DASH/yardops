'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Users, 
  FileText, 
  Settings,
  LayoutDashboard
} from 'lucide-react';

import { TrialBanner } from '@/components/trial-banner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarItems = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { title: 'Schedule', icon: Calendar, href: '/dashboard/schedule' },
    { title: 'Customers', icon: Users, href: '/dashboard/customers' },
    { title: 'Invoices', icon: FileText, href: '/dashboard/invoices' },
    { title: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#1A1C1E] text-white flex flex-col">
      <TrialBanner />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#121416] border-r border-slate-800 flex flex-col hidden lg:flex fixed h-full mt-auto">
          <div className="p-8 pb-12">
            <h1 className="text-2xl font-bold leading-tight">
              Garden<br />
              <span className="text-slate-400 font-normal">Service</span>
            </h1>
          </div>
          
          <nav className="flex-1 px-4 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link 
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 rounded-xl cursor-pointer transition-colors",
                    isActive ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "")} />
                  <span className="font-bold">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-8 border-t border-slate-800 text-slate-500 text-xs font-bold tracking-widest">
            ROOTOS v1.0
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          {children}
        </div>
      </div>
    </div>
  );
}
