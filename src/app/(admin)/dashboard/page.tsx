'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Play, 
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { 
  getOrganization, 
  getTodaysJobs, 
  updateJobStatus, 
  assignStaff,
  getStats,
  getStaff,
  Booking,
  SubscriptionInfo,
  DashboardStats,
  Staff
} from '@/lib/data';

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Booking[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [sub, setSub] = useState<SubscriptionInfo | null>(null);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial load
  React.useEffect(() => {
    async function loadData() {
      try {
        const [orgData, statsData, todayJobs, staffList] = await Promise.all([
          getOrganization(),
          getStats(),
          getTodaysJobs(),
          getStaff()
        ]);
        
        setJobs(todayJobs);
        setStats(statsData as any);
        setStaff(staffList);
        
        // Mock subscription info for the UI
        setSub({
          isValid: true,
          tier: 'professional',
          tierName: 'Professional',
          status: 'active',
          daysRemaining: 12,
          isTrial: true,
          trialEnd: null,
          features: ['whatsapp', 'staff_view', 'analytics'],
          errorMessage: null
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleStatusUpdate = async (jobId: string, status: string) => {
    try {
      await updateJobStatus(jobId, status as any);
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: status as any } : j));
    } catch (err) {
      console.error(err);
    }
  };

  const handleStaffAssign = async (jobId: string, staffId: string) => {
    try {
      await assignStaff(jobId, staffId);
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, staff_id: staffId } : j));
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div className="p-12 text-center text-slate-500">Loading Dashboard...</div>;

  return (
    <main className="p-6 lg:p-12 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-2">Dashboard</h1>
          <p className="text-slate-400 text-lg font-medium italic">Welcome back to RootOS</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="rounded-2xl h-14 px-6 gap-2 font-bold">
            <Calendar className="w-5 h-5" /> View Calendar
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-8 gap-2 font-bold shadow-xl shadow-primary/20">
            <Zap className="w-5 h-5 fill-current" /> New Job
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#25282C] p-8 rounded-[2.5rem] border border-slate-800 shadow-sm">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Monthly Revenue</p>
          <h2 className="text-4xl font-black text-white mb-2">R{stats?.monthly_revenue.toLocaleString()}</h2>
          <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
            <Zap className="w-4 h-4 fill-current" /> +12% from last month
          </div>
        </div>
        <div className="bg-[#25282C] p-8 rounded-[2.5rem] border border-slate-800 shadow-sm">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Upcoming Jobs</p>
          <h2 className="text-4xl font-black text-white mb-2">{stats?.upcoming_jobs}</h2>
          <p className="text-slate-400 font-medium text-sm">Next 7 days</p>
        </div>
        <div className="bg-[#25282C] p-8 rounded-[2.5rem] border border-slate-800 shadow-sm">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Total Customers</p>
          <h2 className="text-4xl font-black text-white mb-2">{stats?.total_customers}</h2>
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Users className="w-4 h-4" /> +4 new this week
          </div>
        </div>
        <div className="bg-[#25282C] p-8 rounded-[2.5rem] border border-slate-800 shadow-sm">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Pending Payments</p>
          <h2 className="text-4xl font-black text-white mb-2">R{stats?.pending_payments.toLocaleString()}</h2>
          <p className="text-amber-500 font-bold text-sm">Requires attention</p>
        </div>
      </div>

      {sub?.isTrial && (
        <div className="mb-12 bg-primary/5 border border-primary/20 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-center md:text-left">
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Your Professional Trial is Active</h3>
              <p className="text-slate-400">You have access to all Professional features for {sub.daysRemaining} more days.</p>
            </div>
          </div>
          <Link href="/dashboard/settings/billing">
            <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-lg shadow-primary/20">
              Upgrade to Professional
            </Button>
          </Link>
        </div>
      )}

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-200">Today&apos;s Schedule</h3>
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold border border-primary/20">
            {jobs.length} Jobs
          </span>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-[#25282C] p-6 lg:p-8 rounded-[2.5rem] border border-slate-800 hover:border-slate-700 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "h-16 w-16 rounded-[1.5rem] flex items-center justify-center text-2xl shadow-inner",
                  job.status === 'completed' ? "bg-green-500/10 text-green-500" : 
                  job.status === 'in_progress' ? "bg-amber-500/10 text-amber-500" : "bg-slate-500/10 text-slate-400"
                )}>
                  {job.status === 'completed' ? <CheckCircle2 className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{job.customer_name}</h4>
                  <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.service_address_line1}</span>
                    <span className="h-1 w-1 bg-slate-700 rounded-full" />
                    <span>{job.scheduled_time_start}</span>
                    <span className="h-1 w-1 bg-slate-700 rounded-full" />
                    <span className="text-primary font-bold">{job.service_name}</span>
                    <span className="h-1 w-1 bg-slate-700 rounded-full" />
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <select
                        className="bg-transparent border-none text-slate-400 font-bold focus:ring-0 cursor-pointer hover:text-white transition-colors"
                        value={job.staff_id || ''}
                        onChange={(e) => handleStaffAssign(job.id, e.target.value)}
                      >
                        <option value="" disabled>Assign Staff</option>
                        {staff.map(s => (
                          <option key={s.id} value={s.id} className="bg-[#25282C] text-white">{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {job.status === 'confirmed' && (
                  <Button 
                    onClick={() => handleStatusUpdate(job.id, 'in_progress')}
                    className="bg-amber-600 hover:bg-amber-500 text-white gap-2 rounded-2xl h-12"
                  >
                    <Play className="w-4 h-4 fill-current" /> Start Job
                  </Button>
                )}
                {job.status === 'in_progress' && (
                  <Button 
                    onClick={() => handleStatusUpdate(job.id, 'completed')}
                    className="bg-green-600 hover:bg-green-500 text-white gap-2 rounded-2xl h-12"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Complete
                  </Button>
                )}
                {job.status === 'completed' && (
                  <div className="text-green-500 font-bold flex items-center gap-2 px-4">
                    <CheckCircle2 className="w-5 h-5" /> Done
                  </div>
                )}
                <WhatsAppButton phone={job.phone || ''} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
