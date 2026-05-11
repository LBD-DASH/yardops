import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cta' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg',
    secondary: 'bg-muted text-primary border border-border hover:bg-secondary/10 rounded-lg',
    cta: 'bg-accent text-accent-foreground hover:bg-accent/90 rounded-full shadow-lg shadow-accent/20',
    ghost: 'hover:bg-secondary/10 text-primary rounded-lg',
  };
  
  const sizes = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
