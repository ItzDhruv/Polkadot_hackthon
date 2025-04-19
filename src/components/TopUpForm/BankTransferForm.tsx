import React, { useState } from 'react';
import { CopyCheck, Copy, FileText } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import { FiatCurrency } from '../../types';

interface BankTransferFormProps {
  amount: number;
  currency: FiatCurrency;
}

const BankTransferForm: React.FC<BankTransferFormProps> = ({ amount, currency }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Mock bank details
  const bankDetails = {
    accountName: 'Cere Network Foundation',
    accountNumber: currency === 'USD' ? '9876543210' : '1234567890',
    routingNumber: currency === 'USD' ? 'CERENW123' : 'CERENW456',
    bankName: 'Global Digital Bank',
    reference: `CERE-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
  };
  
  const copyToClipboard = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-neutral-900">Bank Transfer Details</h3>
      
      <Alert variant="info" title="Processing Time">
        Bank transfers typically take 1-3 business days to process. Your account will be 
        credited once payment is received.
      </Alert>
      
      <Card className="overflow-hidden">
        <div className="bg-neutral-50 p-4 border-b border-neutral-200">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Transfer Amount</h4>
            <span className="text-xl font-semibold">{currency} {amount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-neutral-100">
            <div className="text-sm text-neutral-500">Account Name</div>
            <div className="col-span-2 font-medium">{bankDetails.accountName}</div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-neutral-100">
            <div className="text-sm text-neutral-500">Account Number</div>
            <div className="col-span-1 font-medium">{bankDetails.accountNumber}</div>
            <div className="col-span-1 text-right">
              <button
                onClick={() => copyToClipboard('accountNumber', bankDetails.accountNumber)}
                className="text-primary-500 hover:text-primary-600"
              >
                {copiedField === 'accountNumber' ? (
                  <CopyCheck className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-neutral-100">
            <div className="text-sm text-neutral-500">Routing Number / SWIFT</div>
            <div className="col-span-1 font-medium">{bankDetails.routingNumber}</div>
            <div className="col-span-1 text-right">
              <button
                onClick={() => copyToClipboard('routingNumber', bankDetails.routingNumber)}
                className="text-primary-500 hover:text-primary-600"
              >
                {copiedField === 'routingNumber' ? (
                  <CopyCheck className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-neutral-100">
            <div className="text-sm text-neutral-500">Bank Name</div>
            <div className="col-span-2 font-medium">{bankDetails.bankName}</div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-neutral-100">
            <div className="text-sm text-neutral-500">Reference <span className="text-error-500">*</span></div>
            <div className="col-span-1 font-mono font-medium">{bankDetails.reference}</div>
            <div className="col-span-1 text-right">
              <button
                onClick={() => copyToClipboard('reference', bankDetails.reference)}
                className="text-primary-500 hover:text-primary-600"
              >
                {copiedField === 'reference' ? (
                  <CopyCheck className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="pt-2 text-sm text-error-600">
            * Include this reference in your transfer to ensure proper credit to your account.
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button 
          variant="secondary"
          leftIcon={<FileText className="h-4 w-4" />}
        >
          Download Instructions
        </Button>
        
        <Button>I've Completed the Transfer</Button>
      </div>
    </div>
  );
};

export default BankTransferForm;