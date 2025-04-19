import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  label?: string;
  helperText?: string;
  error?: string;
  onChange?: (value: string) => void;
  containerClassName?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    options, 
    label, 
    helperText, 
    error, 
    onChange, 
    containerClassName, 
    ...props 
  }, ref) => {
    const id = props.id || React.useId();
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };
    
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
          <select
            id={id}
            className={cn(
              'flex h-10 w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 pr-10 text-sm',
              'ring-offset-white placeholder:text-neutral-400',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-error-500 focus:ring-error-500',
              className
            )}
            onChange={handleChange}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown 
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" 
          />
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

Select.displayName = 'Select';

export default Select;