'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkSubscription, SubscriptionInfo, isFeatureEnabled } from '@/lib/data';
import { UpgradeModal } from './upgrade-modal';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phone: string;
  className?: string;
  variant?: 'primary' | 'ghost' | 'secondary';
}

export function WhatsAppButton({ phone, className, variant = 'ghost' }: WhatsAppButtonProps) {
  const [sub, setSub] = useState<SubscriptionInfo | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    checkSubscription('org-1').then(setSub);
  }, []);

  const whatsappEnabled = isFeatureEnabled(sub, 'whatsapp');

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!whatsappEnabled) {
      setShowUpgradeModal(true);
      return;
    }
    window.open(`https://wa.me/${phone.replace('+', '')}`, '_blank');
  };

  return (
    <>
      <Button 
        variant={variant} 
        className={cn(
          "h-12 w-12 p-0 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 relative group",
          !whatsappEnabled && "opacity-50",
          className
        )}
        onClick={handleClick}
      >
        <MessageSquare className={cn("w-5 h-5", whatsappEnabled ? "text-green-500" : "text-slate-400")} />
        {!whatsappEnabled && (
          <div className="absolute -top-1 -right-1 bg-slate-800 rounded-full p-0.5 border border-slate-700">
            <Lock className="w-3 h-3 text-amber-500" />
          </div>
        )}
      </Button>

      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
        featureName="WhatsApp Notifications" 
      />
    </>
  );
}
