'use client';

import React, { useEffect, useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Navigation, 
  CheckCircle2, 
  Play, 
  Loader2,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { getStaffJobs, updateJobStatus, checkSubscription, Booking, JobStatus, SubscriptionInfo, isFeatureEnabled } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { cn } from '@/lib/utils';

export default function StaffSchedulePage() {
  const [jobs, setJobs] = useState<Booking[]>([]);
  const [sub, setSub] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const staffId = '1'; // Mock logged-in staff ID

  useEffect(() => {
    async function loadData() {
      try {
        const [jobsData, subData] = await Promise.all([
          getStaffJobs(staffId),
          checkSubscription('org-1')
        ]);
        setJobs(jobsData);
        setSub(subData);
      } catch (error) {
        console.error('Failed to load staff data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleStatusUpdate = async (jobId: string, newStatus: JobStatus) => {
    try {
      await updateJobStatus(jobId, newStatus);
      setJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      ));

      // Notification logic
      if (isFeatureEnabled(sub, 'whatsapp')) {
        if (newStatus === 'in_progress') {
          console.log('WhatsApp: "On my way!" sent to customer.');
        } else if (newStatus === 'completed') {
          console.log('WhatsApp: "Job completed!" sent to customer.');
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const activeJob = jobs.find(j => j.status === 'in_progress');
  const upcomingJobs = jobs.filter(j => j.status !== 'in_progress' && j.status !== 'completed');

  return (
    <div className="p-4 space-y-6">
      <header>
        <h2 className="text-2xl font-bold">Today&apos;s Jobs</h2>
        <p className="text-slate-500 text-sm">{jobs.length} jobs assigned</p>
      </header>

      {/* Active Job Card */}
      {activeJob && (
        <section className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-amber-500 flex items-center gap-2">
            <span className="h-2 w-2 bg-amber-500 rounded-full animate-pulse" />
            Active Job
          </h3>
          <div className="bg-[#25282C] rounded-3xl p-6 border-2 border-amber-500/50 shadow-lg shadow-amber-500/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold mb-1">{activeJob.customer_name}</h4>
                <p className="text-primary font-bold text-sm">{activeJob.service_name}</p>
              </div>
              <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-2 py-1 rounded-md uppercase">In Progress</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed">{activeJob.service_address_line1}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="secondary" 
                className="bg-slate-800 border-none h-12 rounded-2xl gap-2 text-white"
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeJob.service_address_line1)}`, '_blank')}
              >
                <Navigation className="w-4 h-4" /> Navigate
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-500 h-12 rounded-2xl gap-2 text-white shadow-lg shadow-green-600/20"
                onClick={() => handleStatusUpdate(activeJob.id, 'completed')}
              >
                <CheckCircle2 className="w-4 h-4" /> Complete
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Jobs */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Upcoming</h3>
        <div className="space-y-3">
          {upcomingJobs.length > 0 ? upcomingJobs.map((job) => (
            <div key={job.id} className="bg-[#25282C] rounded-3xl p-5 border border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg">{job.customer_name}</h4>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{job.scheduled_time_start}</span>
                    <span className="h-1 w-1 bg-slate-700 rounded-full" />
                    <span className="text-primary font-bold uppercase tracking-tighter">{job.service_name}</span>
                  </div>
                </div>
                <WhatsAppButton phone={job.phone} className="h-10 w-10" />
              </div>

              <div className="flex items-center gap-3 mb-5">
                <MapPin className="w-4 h-4 text-slate-600 shrink-0" />
                <p className="text-slate-400 text-xs truncate">{job.service_address_line1}</p>
              </div>

              <Button 
                className="w-full bg-slate-800 hover:bg-slate-700 h-12 rounded-2xl gap-2 text-white border-none"
                onClick={() => handleStatusUpdate(job.id, 'in_progress')}
                disabled={!!activeJob}
              >
                <Play className="w-4 h-4 fill-current" /> Start Job
              </Button>
            </div>
          )) : (
            <div className="py-12 text-center bg-[#25282C] rounded-3xl border border-dashed border-slate-800">
              <CheckCircle2 className="w-10 h-10 text-slate-700 mx-auto mb-2" />
              <p className="text-slate-500 font-bold">All caught up!</p>
            </div>
          )}
        </div>
      </section>

      {/* Completed (Summary) */}
      <section className="pt-4">
        <button className="w-full flex items-center justify-between text-slate-500 py-2">
          <span className="text-xs font-bold uppercase tracking-widest">View Completed Jobs</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
