import React from 'react';
import { CheckCircle, HelpCircle, ArrowRight, Home } from 'lucide-react';
import Button from '../ui/Button';
import { Transaction } from '../../types';
import { formatCryptoCurrency } from '../../lib/utils';

interface PaymentSuccessProps {
  transaction: Transaction;
  onClose: () => void;
  onViewHistory: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  transaction,
  onClose,
  onViewHistory,
}) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center text-success-600 animate-bounce-slow">
          <CheckCircle className="h-8 w-8" />
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-neutral-900">Payment Successful!</h3>
        <p className="text-neutral-600 mt-2">
          Your account has been topped up with {formatCryptoCurrency(transaction.amountInCere)}
        </p>
      </div>
      
      <div className="py-4 px-6 bg-neutral-50 rounded-lg border border-neutral-200">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-neutral-500">Transaction ID:</span>
          <span className="font-medium">{transaction.id}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-neutral-500">Date:</span>
          <span className="font-medium">{new Date(transaction.timestamp).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-neutral-500">Status:</span>
          <span className="text-success-600 font-medium">Complete</span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button 
          variant="secondary"
          leftIcon={<HelpCircle className="h-4 w-4" />}
          className="flex-1"
          onClick={onViewHistory}
        >
          View Transaction History
        </Button>
        
        <Button 
          className="flex-1"
          rightIcon={<ArrowRight className="h-4 w-4" />}
          onClick={onClose}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;