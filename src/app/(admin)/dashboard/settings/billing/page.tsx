'use client';

import React, { useEffect, useState } from 'react';
import { Check, Loader2, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getOrganization, Organization } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function BillingPage() {
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrganization().then((data) => {
      setOrg(data);
      setLoading(false);
    });
  }, []);

  const plans = [
    {
      name: 'Starter',
      price: 'R 149',
      description: 'Perfect for getting started.',
      features: ['Basic booking', 'Email notifications', 'Up to 50 bookings/mo'],
      tier: 'starter',
      icon: Shield
    },
    {
      name: 'Professional',
      price: 'R 299',
      description: 'For growing garden services.',
      features: [
        'WhatsApp Notifications',
        'Staff Mobile View',
        'Recurring bookings',
        'Custom branding',
        'Basic analytics'
      ],
      tier: 'professional',
      highlight: true,
      icon: Zap
    },
    {
      name: 'Enterprise',
      price: 'R 599',
      description: 'Advanced business tools.',
      features: [
        'Route optimization',
        'AI quoting engine',
        'API access',
        'Priority support',
        'Advanced analytics'
      ],
      tier: 'enterprise',
      icon: Sparkles
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <main className="p-6 lg:p-12 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-black mb-4">Pricing & Plans</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Choose the right plan to grow your garden service business. Upgrade anytime as you scale.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={cn(
              "bg-[#25282C] rounded-[2.5rem] p-8 border transition-all flex flex-col h-full relative overflow-hidden",
              plan.highlight ? "border-primary shadow-2xl shadow-primary/20 scale-105 z-10" : "border-slate-800 hover:border-slate-700",
              org?.subscription_tier === plan.tier && "ring-2 ring-primary ring-offset-4 ring-offset-[#1A1C1E]"
            )}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-bl-2xl">
                Most Popular
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
               <div className={cn(
                 "h-12 w-12 rounded-2xl flex items-center justify-center",
                 plan.highlight ? "bg-primary text-white" : "bg-slate-800 text-slate-400"
               )}>
                 <plan.icon className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-bold">{plan.name}</h3>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-slate-500 font-bold">/mo</span>
              </div>
              <p className="text-slate-400 text-sm mt-2">{plan.description}</p>
            </div>

            <div className="space-y-4 flex-1 mb-10">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              className={cn(
                "w-full h-14 rounded-2xl font-bold text-lg transition-all",
                plan.highlight ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" : "bg-slate-800 hover:bg-slate-700 text-white",
                org?.subscription_tier === plan.tier && "opacity-50 cursor-default"
              )}
              disabled={org?.subscription_tier === plan.tier}
            >
              {org?.subscription_tier === plan.tier ? 'Current Plan' : `Get ${plan.name}`}
            </Button>
          </div>
        ))}
      </div>

      <footer className="mt-20 p-12 bg-white/5 rounded-[3rem] border border-slate-800 text-center">
        <h4 className="text-2xl font-bold mb-4 text-white">Need a custom plan?</h4>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          Running a large franchise with special requirements? Contact our sales team for custom pricing and dedicated support.
        </p>
        <Button variant="ghost" className="border-slate-700 text-white hover:bg-white/5 rounded-2xl h-14 px-10 font-bold">
          Contact Sales
        </Button>
      </footer>
    </main>
  );
}
