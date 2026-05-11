'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { UploadCloud, Check, User, Briefcase, Shovel, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';

const steps = [
  { id: 'general', title: 'Account', icon: User },
  { id: 'business', title: 'Business', icon: Briefcase },
  { id: 'services', title: 'Services', icon: Shovel },
  { id: 'payments', title: 'Payments', icon: CreditCard },
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const { branding, setBranding } = useTheme();
  
  // Form State
  const [accountData, setAccountData] = useState({ name: '', email: '' });
  const [businessName, setBusinessName] = useState('');
  const [services, setServices] = useState([
    { id: 'mowing', name: 'Lawn Mowing', selected: true },
    { id: 'trimming', name: 'Hedge Trimming', selected: true },
    { id: 'trees', name: 'Tree Cutting', selected: false },
    { id: 'cleanup', name: 'Garden Cleanup', selected: false },
  ]);
  const [paymentKeys, setPaymentKeys] = useState({
    payfastMerchantId: '',
    payfastApiKey: '',
    ozowMerchantId: '',
    ozowApiKey: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // TODO: Wire Supabase here
    await new Promise(r => setTimeout(r, 1500));
    window.location.href = '/dashboard';
  };

  const toggleService = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="space-y-2">
              <h1 className="text-4xl font-black text-slate-900 leading-tight">Welcome to RootOS</h1>
              <p className="text-slate-500 text-lg">Let&apos;s get your digital garden business started.</p>
            </header>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="owner-name" className="text-sm font-black uppercase tracking-widest text-slate-400">Your Full Name</Label>
                <Input 
                  id="owner-name"
                  placeholder="e.g. John Smith" 
                  className="h-14 rounded-xl border-slate-200 bg-white px-6 focus:ring-primary"
                  value={accountData.name}
                  onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="owner-email" className="text-sm font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                <Input 
                  id="owner-email"
                  type="email"
                  placeholder="john@example.com" 
                  className="h-14 rounded-xl border-slate-200 bg-white px-6 focus:ring-primary"
                  value={accountData.email}
                  onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="space-y-2">
              <h1 className="text-4xl font-black text-slate-900 leading-tight">Business Branding</h1>
              <p className="text-slate-500 text-lg">How should your customers see you?</p>
            </header>
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="biz-name" className="text-sm font-black uppercase tracking-widest text-slate-400">Business Name</Label>
                <Input 
                  id="biz-name"
                  placeholder="GreenLawn Services" 
                  className="h-14 rounded-xl border-slate-200 bg-white px-6 focus:ring-primary"
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    setBranding({ ...branding, name: e.target.value });
                  }}
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-black uppercase tracking-widest text-slate-400">Company Logo</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium text-center leading-relaxed">
                    Click to upload or drag and drop<br/>
                    <span className="text-xs text-slate-400">SVG, PNG, JPG (max 2MB)</span>
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                 <Label className="text-sm font-black uppercase tracking-widest text-slate-400">Primary Brand Color</Label>
                 <div className="flex gap-4">
                   {['#2D5A27', '#4A7C44', '#D97706', '#1A1A1A'].map(color => (
                     <button 
                       key={color}
                       className={cn(
                         "w-12 h-12 rounded-full border-4 border-white shadow-md transition-all hover:scale-110",
                         branding.brand_primary_color === color && "ring-2 ring-primary scale-110"
                       )}
                       style={{ backgroundColor: color }}
                       onClick={() => setBranding({ ...branding, brand_primary_color: color })}
                     />
                   ))}
                 </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="space-y-2">
              <h1 className="text-4xl font-black text-slate-900 leading-tight">Select Services</h1>
              <p className="text-slate-500 text-lg">Pick the services you offer. You can change this later.</p>
            </header>
            <div className="grid grid-cols-1 gap-4">
              {services.map(service => (
                <div 
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={cn(
                    "p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between",
                    service.selected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-slate-100 bg-white hover:border-slate-200"
                  )}
                >
                  <span className={cn("text-lg font-bold", service.selected ? "text-primary" : "text-slate-700")}>
                    {service.name}
                  </span>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
                    service.selected ? "bg-primary border-primary" : "border-slate-200"
                  )}>
                    {service.selected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="mt-2 border-2 border-dashed border-slate-200 h-16 rounded-2xl text-slate-400 font-bold">
                + Add Custom Service
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="space-y-2">
              <h1 className="text-4xl font-black text-slate-900 leading-tight">Connect Payments</h1>
              <p className="text-slate-500 text-lg">Receive payments directly to your account. Enter your API credentials.</p>
            </header>
            <div className="space-y-8">
              {/* PayFast */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">PF</div>
                   <h3 className="text-lg font-black text-slate-800">PayFast</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Merchant ID</Label>
                    <Input 
                      placeholder="e.g. 12345678" 
                      className="h-12 rounded-xl bg-white border-slate-200"
                      value={paymentKeys.payfastMerchantId}
                      onChange={(e) => setPaymentKeys({ ...paymentKeys, payfastMerchantId: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Merchant Key</Label>
                    <Input 
                      placeholder="e.g. abc123def456" 
                      className="h-12 rounded-xl bg-white border-slate-200"
                      value={paymentKeys.payfastApiKey}
                      onChange={(e) => setPaymentKeys({ ...paymentKeys, payfastApiKey: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Ozow */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-black text-xs">OZ</div>
                   <h3 className="text-lg font-black text-slate-800">Ozow</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Site Code</Label>
                    <Input 
                      placeholder="e.g. ABC-DEF-123" 
                      className="h-12 rounded-xl bg-white border-slate-200"
                      value={paymentKeys.ozowMerchantId}
                      onChange={(e) => setPaymentKeys({ ...paymentKeys, ozowMerchantId: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Private Key</Label>
                    <Input 
                      placeholder="e.g. key_123456..." 
                      className="h-12 rounded-xl bg-white border-slate-200"
                      value={paymentKeys.ozowApiKey}
                      onChange={(e) => setPaymentKeys({ ...paymentKeys, ozowApiKey: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      {/* Step Indicator */}
      <div className="mb-16">
        <div className="flex items-center justify-between relative px-2">
          {/* Progress Bar Background */}
          <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full" />
          {/* Active Progress Bar */}
          <div 
            className="absolute top-5 left-0 h-1 bg-primary transition-all duration-500 -z-10 rounded-full" 
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-4 border-background transition-all duration-500 shadow-sm",
                  index < currentStep ? "bg-primary text-white" : 
                  index === currentStep ? "bg-primary text-white scale-110 ring-4 ring-primary/20" : "bg-white text-slate-300 border-slate-100"
                )}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest mt-3 transition-colors duration-500",
                index === currentStep ? "text-primary" : "text-slate-400"
              )}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 md:p-12">
          {renderStep()}
        </div>
        
        <div className="bg-slate-50/50 p-8 border-t border-slate-100 flex items-center justify-between gap-4">
          <Button 
            variant="secondary"
            className={cn("h-16 px-8 rounded-2xl font-bold gap-2", currentStep === 0 && "invisible")}
            onClick={prevStep}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          <Button 
            className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg gap-2 min-w-[160px] shadow-lg shadow-primary/20"
            onClick={nextStep}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Creating your business...'
            ) : currentStep === steps.length - 1 ? (
              <>Finish Setup <Check className="w-5 h-5" /></>
            ) : (
              <>Continue <ArrowRight className="w-5 h-5" /></>
            )}
          </Button>
        </div>
      </div>

      <p className="mt-8 text-center text-slate-400 text-xs font-medium">
        Powered by RootOS &bull; Standard License
      </p>
    </div>
  );
}
