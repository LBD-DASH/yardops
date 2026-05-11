import React from 'react';
import { getBranding } from '@/lib/branding';
import { ThemeProvider } from '@/components/theme-provider';

export default async function PortalLayout(props: {
  children: React.ReactNode;
  params: Promise<{ businessId: string }>;
}) {
  const params = await props.params;
  const businessId = params.businessId;
  const branding = await getBranding(businessId);

  return (
    <ThemeProvider initialBranding={branding}>
      {props.children}
    </ThemeProvider>
  );
}
