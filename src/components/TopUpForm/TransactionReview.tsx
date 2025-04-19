import React from 'react';
import { AlertCircle, Check, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { PaymentMethod, Transaction } from '../../types';
import { formatCurrency, formatCryptoCurrency } from '../../lib/utils';

interface TransactionReviewProps {
  transaction: Transaction;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PaymentMethodLabel: Record<PaymentMethod, string> = {
  card: 'Credit Card',
  crypto: 'Cryptocurrency',
  bank: 'Bank Transfer',
};

const TransactionReview: React.FC<TransactionReviewProps> = ({
  transaction,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-neutral-900">Review Your Transaction</h3>
        <p className="text-neutral-600 mt-1">Please verify all details before confirming</p>
      </div>
      
      <Card>
        <div className="bg-neutral-50 p-4 border-b border-neutral-200">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Transaction Summary</h4>
            <span className="text-sm text-neutral-500">Transaction ID: {transaction.id}</span>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-neutral-100">
            <div className="text-sm text-neutral-500">Payment Method</div>
            <div className="col-span-2 font-medium">{PaymentMethodLabel[transaction.method]}</div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-neutral-100">
            <div className="text-sm text-neutral-500">Amount</div>
            <div className="col-span-2 font-medium">
              {typeof transaction.currency === 'string' && ['USDT', 'USDC', 'DAI'].includes(transaction.currency)
                ? `${transaction.amount} ${transaction.currency}`
                : formatCurrency(transaction.amount, transaction.currency as 'USD')
              }
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-neutral-100">
            <div className="text-sm text-neutral-500">CERE Tokens</div>
            <div className="col-span-2 font-semibold text-primary-700">
              {formatCryptoCurrency(transaction.amountInCere)}
            </div>
          </div>
          
          {transaction.network && (
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-neutral-100">
              <div className="text-sm text-neutral-500">Network</div>
              <div className="col-span-2 font-medium">{transaction.network}</div>
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="text-sm text-neutral-500">Date</div>
            <div className="col-span-2 font-medium">
              {new Date(transaction.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      </Card>
      
      <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
        <div className="flex items-start gap-3">
          <div className="text-warning-500 flex-shrink-0 mt-0.5">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <h5 className="font-medium text-neutral-900">Important Notice</h5>
            <p className="text-sm text-neutral-700 mt-1">
              By confirming this transaction, you agree to Cere Network's Terms of Service
              and Privacy Policy. All transactions are final and non-refundable.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="secondary" 
          onClick={onCancel}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          onClick={onConfirm}
          isLoading={isLoading}
          className="flex-1"
          rightIcon={<ChevronRight className="h-4 w-4" />}
        >
          Confirm & Pay
        </Button>
      </div>
    </div>
  );
};

export default TransactionReview;