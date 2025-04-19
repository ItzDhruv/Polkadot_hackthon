import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import Input from '../ui/Input';
import Select, { SelectOption } from '../ui/Select';
import { formatCurrency, formatCryptoCurrency, getCereAmount } from '../../lib/utils';
import { FiatCurrency, CryptoToken } from '../../types';

interface AmountInputProps {
  amount: number;
  currency: FiatCurrency | CryptoToken;
  onChange: (amount: number) => void;
  onCurrencyChange: (currency: FiatCurrency | CryptoToken) => void;
  isCrypto?: boolean;
}

const fiatOptions: SelectOption[] = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
];

const cryptoOptions: SelectOption[] = [
  { value: 'USDT', label: 'USDT' },
  { value: 'USDC', label: 'USDC' },
  { value: 'DAI', label: 'DAI' },
];

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  currency,
  onChange,
  onCurrencyChange,
  isCrypto = false,
}) => {
  const [cereAmount, setCereAmount] = useState<number>(0);
  const options = isCrypto ? cryptoOptions : fiatOptions;
  
  // Calculate CERE amount based on input
  useEffect(() => {
    // For simplicity, assume 1 CERE = $0.05 USD
    const cere = getCereAmount(amount);
    setCereAmount(cere);
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onChange(isNaN(value) ? 0 : value);
  };
  
  const handleCurrencyChange = (value: string) => {
    onCurrencyChange(value as FiatCurrency | CryptoToken);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-neutral-900">Enter Amount</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Input
            type="number"
            label="Amount"
            leftIcon={<DollarSign className="h-4 w-4" />}
            value={amount || ''}
            onChange={handleAmountChange}
            min={0}
            step={isCrypto ? 0.01 : 1}
            placeholder="0.00"
          />
        </div>
        
        <div>
          <Select
            label="Currency"
            options={options}
            value={currency}
            onChange={handleCurrencyChange}
          />
        </div>
      </div>
      
      {amount > 0 && (
        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
          <div className="flex justify-between">
            <span className="text-neutral-600">You Pay:</span>
            <span className="font-medium">{isCrypto 
              ? `${amount} ${currency}`
              : formatCurrency(amount, currency as FiatCurrency)
            }</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-neutral-600">You Receive:</span>
            <span className="font-semibold text-primary-700">{formatCryptoCurrency(cereAmount)}</span>
          </div>
          <div className="mt-3 text-xs text-neutral-500">
            Rate: 1 CERE = $0.05 USD (Rates are updated every 5 minutes)
          </div>
        </div>
      )}
    </div>
  );
};

export default AmountInput;