import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    label, 
    helperText, 
    error, 
    leftIcon, 
    rightIcon, 
    containerClassName, 
    ...props 
  }, ref) => {
    const id = props.id || React.useId();
    
    return (
      <div className={cn('space-y-1', containerClassName)}>
        {label && (
          <label 
            htmlFor={id}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
              {leftIcon}
            </div>
          )}
          <input
            id={id}
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm',
              'ring-offset-white placeholder:text-neutral-400',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-error-500 focus:ring-error-500',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p className="text-xs text-neutral-500">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-error-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;