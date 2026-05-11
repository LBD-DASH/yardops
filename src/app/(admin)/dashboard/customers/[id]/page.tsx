'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Loader2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { getCustomers, getJobsForCustomer, Customer, Booking } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { cn } from '@/lib/utils';

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [history, setHistory] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const customers = await getCustomers();
        const found = customers.find(c => c.id === params.id);
        if (found) {
          setCustomer(found);
          const jobs = await getJobsForCustomer(found.id);
          setHistory(jobs);
        }
      } catch (error) {
        console.error('Failed to load customer details:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!customer) {
    return <div className="p-12 text-center text-slate-500 font-bold">Customer not found.</div>;
  }

  return (
    <main className="flex-1 p-6 lg:p-12">
      <Button 
        variant="ghost" 
        className="mb-8 gap-2 text-slate-400 hover:text-white pl-0"
        onClick={() => router.back()}
      >
        <ChevronLeft className="w-5 h-5" /> Back to Customers
      </Button>

      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="flex items-center gap-8">
          <div className="h-24 w-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary text-4xl font-bold">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-5xl font-bold mb-4">{customer.name}</h2>
            <div className="flex flex-wrap items-center gap-6 text-slate-400 font-medium text-lg">
              <span className="flex items-center gap-2"><Phone className="w-5 h-5 text-primary" /> {customer.phone}</span>
              <WhatsAppButton phone={customer.phone} />
              <span className="flex items-center gap-2"><Mail className="w-5 h-5 text-primary" /> {customer.email}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#25282C] px-8 py-4 rounded-3xl border border-slate-800 text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-primary">R {customer.total_spent}</p>
          </div>
          <div className="bg-[#25282C] px-8 py-4 rounded-3xl border border-slate-800 text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Bookings</p>
            <p className="text-2xl font-bold">{customer.total_bookings}</p>
          </div>
        </div>
      </header>

      <section className="space-y-8">
        <h3 className="text-2xl font-bold text-slate-200">Service History</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {history.map((job) => (
            <div 
              key={job.id} 
              className="bg-[#25282C] p-6 lg:p-8 rounded-[2.5rem] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "h-14 w-14 rounded-2xl flex items-center justify-center",
                  job.status === 'completed' ? "bg-green-500/10 text-green-500" : "bg-slate-500/10 text-slate-400"
                )}>
                  {job.status === 'completed' ? <CheckCircle2 className="w-7 h-7" /> : <Clock className="w-7 h-7" />}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">{job.service_name}</h4>
                  <div className="flex items-center gap-4 text-slate-500 font-medium text-sm">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {job.scheduled_date}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.service_address_line1}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border",
                  job.status === 'completed' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-slate-500/10 text-slate-400 border-slate-800"
                )}>
                  {job.status}
                </span>
                <Button variant="ghost" className="text-primary font-bold">View Invoice</Button>
              </div>
            </div>
          ))}

          {history.length === 0 && (
            <div className="py-12 text-center text-slate-600 bg-[#25282C] rounded-[2.5rem] border border-dashed border-slate-800">
              No service history found.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
