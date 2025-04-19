import React from 'react';
import { CreditCard, Wallet, Banknote } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { PaymentMethod } from '../../types';

interface PaymentMethodOption {
  value: PaymentMethod;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const paymentMethods: PaymentMethodOption[] = [
  {
    value: 'card',
    label: 'Credit Card',
    icon: <CreditCard className="h-5 w-5" />,
    description: 'Pay with Visa, Mastercard, or American Express'
  },
  {
    value: 'crypto',
    label: 'Cryptocurrency',
    icon: <Wallet className="h-5 w-5" />,
    description: 'Pay with USDC or USDT on multiple networks'
  },
  {
    value: 'bank',
    label: 'Bank Transfer',
    icon: <Banknote className="h-5 w-5" />,
    description: 'Pay via bank transfer (may take 1-3 business days)'
  }
];

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-neutral-900">Select Payment Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentMethods.map((method) => (
          <Card
            key={method.value}
            className={`cursor-pointer transition-all ${
              value === method.value 
                ? 'ring-2 ring-primary-500 ring-offset-2' 
                : 'hover:border-primary-200 hover:shadow'
            }`}
            onClick={() => onChange(method.value)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-full ${
                  value === method.value 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {method.icon}
                </div>
                <CardTitle className="text-base">{method.label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600">{method.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;