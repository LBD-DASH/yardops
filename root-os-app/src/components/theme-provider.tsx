'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrandingConfig, defaultBranding } from '@/lib/branding';

type ThemeContextType = {
  branding: BrandingConfig;
  setBranding: (branding: BrandingConfig) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  branding: defaultBranding,
  setBranding: () => {},
});

export const ThemeProvider = ({
  children,
  initialBranding,
}: {
  children: React.ReactNode;
  initialBranding?: BrandingConfig;
}) => {
  const [branding, setBranding] = useState<BrandingConfig>(initialBranding || defaultBranding);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', branding.brand_primary_color);
    root.style.setProperty('--secondary', branding.brand_secondary_color);
    root.style.setProperty('--accent', branding.brand_accent_color);
    root.style.setProperty('--radius', branding.radius || '0.75rem');
    root.style.setProperty('--font-family', branding.font_family);
    
    root.style.setProperty('--primary-foreground', '#FFFFFF');
    root.style.setProperty('--secondary-foreground', '#FFFFFF');
    root.style.setProperty('--accent-foreground', '#FFFFFF');
  }, [branding]);

  return (
    <ThemeContext.Provider value={{ branding, setBranding }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
