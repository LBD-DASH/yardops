'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { 
  Users, 
  Search, 
  MoreVertical, 
  Phone, 
  Mail, 
  History,
  Loader2,
  Plus
} from 'lucide-react';
import { getCustomers, Customer } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadCustomers() {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Failed to load customers:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h2 className="text-4xl font-bold mb-2">Customer Database</h2>
          <p className="text-slate-500 font-medium tracking-wide">Manage your client relationships</p>
        </div>
        <button className="h-14 px-6 bg-primary rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform font-bold">
          <Plus className="w-5 h-5" /> Add Customer
        </button>
      </header>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <Input 
          className="pl-12 h-14 bg-[#25282C] border-slate-800 rounded-2xl focus:ring-primary focus:border-primary text-lg"
          placeholder="Search by name, phone or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCustomers.map((customer) => (
          <div 
            key={customer.id}
            className="bg-[#25282C] p-6 lg:p-8 rounded-[2.5rem] border border-slate-800 hover:border-slate-700 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary text-2xl font-bold">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{customer.name}</h4>
                <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {customer.phone}</span>
                  <span className="h-1 w-1 bg-slate-700 rounded-full" />
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {customer.email}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right hidden sm:block">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Bookings</p>
                <p className="text-xl font-bold">{customer.total_bookings}</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Spent</p>
                <p className="text-xl font-bold text-primary">R {customer.total_spent}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/customers/${customer.id}`}>
                  <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl bg-white/5 hover:bg-white/10">
                    <History className="w-5 h-5 text-slate-400" />
                  </Button>
                </Link>
                <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl bg-white/5 hover:bg-white/10">
                  <MoreVertical className="w-5 h-5 text-slate-400" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="py-20 text-center">
            <Users className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-400">No customers found</h3>
            <p className="text-slate-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </main>
  );
}
