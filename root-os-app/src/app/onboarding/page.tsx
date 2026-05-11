import React from 'react';
import { OnboardingWizard } from '@/components/onboarding/onboarding-wizard';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-4xl px-4 mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">RootOS Onboarding</h1>
        <p className="text-slate-600">Setup your digital garden business in minutes.</p>
      </div>
      <div className="w-full max-w-4xl">
        <OnboardingWizard />
      </div>
    </div>
  );
}
