import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">R</div>
          <span className="text-xl font-bold tracking-tight">RootOS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="hover:text-primary transition-colors">Features</a>
          <a href="#" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#" className="hover:text-primary transition-colors">Login</a>
          <Link href="/onboarding">
            <Button variant="primary" size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="container mx-auto px-6 pt-20 pb-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900">
            We turn your garden service into a <span className="text-primary">professional digital business</span> in one day.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            RootOS provides everything you need to manage bookings, payments, and customers. 
            Ditch the WhatsApp manual admin and go digital.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/onboarding">
              <Button variant="cta" size="lg">Start Your Free Trial</Button>
            </Link>
            <Button variant="secondary" size="lg">Watch Demo</Button>
          </div>
        </section>

        {/* Features */}
        <section className="bg-secondary/5 py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-8">
                  <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 text-2xl">📱</div>
                  <h3 className="text-xl font-bold mb-2">Booking Portal</h3>
                  <p className="text-muted-foreground">Your own branded website where customers can book services and request quotes in seconds.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-8">
                  <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 text-2xl">💸</div>
                  <h3 className="text-xl font-bold mb-2">Easy Payments</h3>
                  <p className="text-muted-foreground">Integrated South African payment options like Ozow, PayFast, and Yoco. Get paid instantly.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-8">
                  <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 text-2xl">📅</div>
                  <h3 className="text-xl font-bold mb-2">Admin Dashboard</h3>
                  <p className="text-muted-foreground">Manage your daily schedule, staff allocation, and customer database from one simple interface.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
