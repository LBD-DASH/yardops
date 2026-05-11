import React from 'react';

export const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`bg-card text-card-foreground rounded-xl border border-border shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 pb-0 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

export const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 pt-0 flex items-center ${className}`}>{children}</div>
);
