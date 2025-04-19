import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  className,
  variant = 'default',
  title,
  icon,
  onClose,
  children,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-neutral-50 border-neutral-200 text-neutral-700',
    success: 'bg-success-50 border-success-200 text-success-700',
    warning: 'bg-warning-50 border-warning-200 text-warning-700',
    error: 'bg-error-50 border-error-200 text-error-700',
  };

  const variantIcons = {
    default: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
  };

  return (
    <div
      className={cn(
        'relative rounded-lg border p-4',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {icon || variantIcons[variant]}
        </div>
        <div className="flex-1">
          {title && (
            <h5 className="mb-1 font-medium">{title}</h5>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            type="button"
            className="ml-auto flex-shrink-0 rounded-full p-1 hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;