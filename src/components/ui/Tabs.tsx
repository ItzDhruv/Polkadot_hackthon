import React from 'react';
import { cn } from '../../lib/utils';

type TabItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'outline' | 'pills';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onChange,
  variant = 'default',
  className,
}) => {
  const variantClasses = {
    default: {
      container: 'border-b border-neutral-200',
      tab: 'border-b-2 border-transparent hover:border-neutral-300',
      active: 'border-primary-500 text-primary-500 hover:border-primary-500',
    },
    outline: {
      container: 'border border-neutral-200 rounded-lg p-1 bg-neutral-50',
      tab: 'rounded-md',
      active: 'bg-white shadow-sm',
    },
    pills: {
      container: 'space-x-1',
      tab: 'rounded-full hover:bg-neutral-100',
      active: 'bg-primary-500 text-white hover:bg-primary-600',
    },
  };
  
  return (
    <div
      className={cn(
        'flex', 
        variantClasses[variant].container, 
        className
      )}
      role="tablist"
    >
      {items.map((item) => (
        <button
          key={item.value}
          role="tab"
          aria-selected={value === item.value}
          disabled={item.disabled}
          className={cn(
            'inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all',
            'focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variantClasses[variant].tab,
            value === item.value ? variantClasses[variant].active : 'text-neutral-600',
          )}
          onClick={() => onChange(item.value)}
        >
          {item.icon && <span className="text-current">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;