import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = {
  default: 'bg-white text-black hover:bg-zinc-200 active:scale-[0.99]',
  outline: 'border border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800 hover:text-white',
  ghost: 'hover:bg-zinc-800 hover:text-white text-zinc-400',
  destructive: 'border border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-red-900/50 hover:bg-red-950/30 hover:text-red-400',
};

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', disabled, children, ...props }, ref) => {
  const sizeClasses = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-8 px-3 text-xs',
    lg: 'h-12 px-6 text-base',
    icon: 'h-9 w-9 p-0 flex items-center justify-center',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-50 disabled:pointer-events-none',
        buttonVariants[variant] || buttonVariants.default,
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
