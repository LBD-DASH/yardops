'use client';

import React, { useEffect, useState } from 'react';
import { getTodaysJobs, Booking } from '@/lib/data';
import { Calendar, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SchedulePage() {
  const [jobs, setJobs] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await getTodaysJobs();
        setJobs(data);
      } catch (error) {
        console.error('Failed to load jobs:', error);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 lg:p-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">Schedule</h2>
          <p className="text-slate-500 font-medium tracking-wide">Manage your team&apos;s daily agenda</p>
        </div>
        <div className="flex items-center gap-4 bg-[#25282C] p-2 rounded-2xl border border-slate-800">
          <Button variant="ghost" className="h-10 w-10 p-0 hover:bg-white/5">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="font-bold px-4">May 2024</span>
          <Button variant="ghost" className="h-10 w-10 p-0 hover:bg-white/5">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="bg-[#25282C] rounded-[2.5rem] border border-slate-800 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-800">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-6 text-center text-slate-500 font-bold text-xs uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 h-[600px]">
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const hasJobs = day === 6; // Mocking jobs for today (May 6)
            return (
              <div 
                key={i} 
                className={cn(
                  "border-r border-b border-slate-800 p-4 hover:bg-white/5 transition-colors cursor-pointer relative",
                  day === 6 ? "bg-primary/5" : ""
                )}
              >
                <span className={cn(
                  "font-bold text-lg",
                  day === 6 ? "text-primary" : "text-slate-400"
                )}>{day}</span>
                {hasJobs && (
                  <div className="mt-4 space-y-2">
                    {jobs.map(job => (
                      <div key={job.id} className="text-[10px] bg-primary/20 text-primary p-2 rounded-lg font-bold truncate">
                        {job.scheduled_time_start} - {job.customer_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
