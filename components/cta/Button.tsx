'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105',
        secondary: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-gray-700',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
        linkedin: 'bg-[#0A66C2] text-white hover:bg-[#004182]',
        calendly: 'bg-[#00A2FF] text-white hover:bg-[#0082CC]',
        sociail: 'bg-blue-600 text-white hover:bg-blue-700',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
      },
      size: {
        sm: 'h-9 px-3 rounded-md',
        md: 'h-11 px-6 rounded-md',
        lg: 'h-12 px-8 rounded-md',
        xl: 'h-14 px-10 text-base rounded-md',
      },
      withIcon: {
        true: 'gap-2',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      withIcon: false,
      fullWidth: false,
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  href?: string;
  external?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const Button = ({
  className,
  variant,
  size,
  withIcon,
  fullWidth,
  isLoading = false,
  href,
  external = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) => {
  const iconOnly = !children && (leftIcon || rightIcon);
  const iconOnlyClass = iconOnly ? 'aspect-square p-0 flex items-center justify-center' : '';
  
  const content = (
    <>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </>
  );

  const buttonClasses = cn(
    buttonVariants({
      variant,
      size,
      withIcon: Boolean(leftIcon || rightIcon || isLoading),
      fullWidth,
    }),
    iconOnlyClass,
    className
  );

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    
    return external ? (
      <a 
        href={href} 
        className={buttonClasses}
        {...externalProps}
        {...props}
      >
        {content}
      </a>
    ) : (
      <Link 
        href={href} 
        className={buttonClasses}
        {...props}
      >
        {content}
      </Link>
    );
  }
  
  return (
    <button
      className={buttonClasses}
      disabled={isLoading}
      {...props}
    >
      {content}
    </button>
  );
};

export { Button, buttonVariants };
