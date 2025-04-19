import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { generateTransactionId, getCereAmount } from '../../lib/utils';
import AmountInput from './AmountInput';
import PaymentMethodSelector from './PaymentMethodSelector';
import CardPaymentForm from './CardPaymentForm';
import CryptoPaymentForm from './CryptoPaymentForm';
import BankTransferForm from './BankTransferForm';
import TransactionReview from './TransactionReview';
import PaymentSuccess from './PaymentSuccess';
import Button from '../ui/Button';
import { FiatCurrency, PaymentMethod, CryptoToken, Transaction, CardFormData } from '../../types';

type Step = 'method' | 'amount' | 'details' | 'review' | 'success';

interface TopUpFormProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

const TopUpForm: React.FC<TopUpFormProps> = ({ onComplete, onCancel }) => {
  // Step management
  const [currentStep, setCurrentStep] = useState<Step>('method');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form data
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [amount, setAmount] = useState<number>(100);
  const [currency, setCurrency] = useState<FiatCurrency | CryptoToken>('USD');
  const [cardData, setCardData] = useState<CardFormData | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  
  // Determine if payment method is crypto
  const isCrypto = paymentMethod === 'crypto';
  
  // Navigation handlers
  const goToNextStep = () => {
    const steps: Step[] = ['method', 'amount', 'details', 'review', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };
  
  const goToPreviousStep = () => {
    const steps: Step[] = ['method', 'amount', 'details', 'review', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };
  
  // Handle amount and currency change
  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
  };
  
  const handleCurrencyChange = (newCurrency: FiatCurrency | CryptoToken) => {
    setCurrency(newCurrency);
  };
  
  // Handle payment method change
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
    // Reset currency based on payment method
    if (method === 'crypto') {
      setCurrency('USDT');
    } else {
      setCurrency('USD');
    }
  };
  
  // Handle card form submission
  const handleCardSubmit = (data: CardFormData) => {
    setCardData(data);
    createTransaction();
    goToNextStep();
  };
  
  // Create transaction record for review
  const createTransaction = () => {
    const newTransaction: Transaction = {
      id: generateTransactionId(),
      amount: amount,
      amountInCere: getCereAmount(amount),
      currency: currency,
      method: paymentMethod,
      status: 'pending',
      timestamp: Date.now(),
      network: isCrypto ? 'ethereum' : undefined,
    };
    
    setTransaction(newTransaction);
  };
  
  // Confirm payment
  const handleConfirmPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      if (transaction) {
        setTransaction({
          ...transaction,
          status: 'completed',
        });
      }
      setIsProcessing(false);
      goToNextStep();
    }, 2000);
  };
  
  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'method':
        return (
          <PaymentMethodSelector 
            value={paymentMethod} 
            onChange={handlePaymentMethodChange} 
          />
        );
        
      case 'amount':
        return (
          <AmountInput 
            amount={amount} 
            currency={currency} 
            onChange={handleAmountChange} 
            onCurrencyChange={handleCurrencyChange}
            isCrypto={isCrypto}
          />
        );
        
      case 'details':
        if (paymentMethod === 'card') {
          return (
            <CardPaymentForm 
              onSubmit={handleCardSubmit}
              isProcessing={isProcessing}
            />
          );
        } else if (paymentMethod === 'crypto') {
          return (
            <CryptoPaymentForm 
              token={currency as CryptoToken}
              onTokenChange={(token) => handleCurrencyChange(token)}
              amount={amount}
            />
          );
        } else if (paymentMethod === 'bank') {
          return (
            <BankTransferForm 
              amount={amount}
              currency={currency as FiatCurrency}
            />
          );
        }
        return null;
        
      case 'review':
        if (!transaction) return null;
        return (
          <TransactionReview 
            transaction={transaction}
            onConfirm={handleConfirmPayment}
            onCancel={goToPreviousStep}
            isLoading={isProcessing}
          />
        );
        
      case 'success':
        if (!transaction) return null;
        return (
          <PaymentSuccess 
            transaction={transaction}
            onClose={onComplete || (() => {})}
            onViewHistory={() => {}}
          />
        );
        
      default:
        return null;
    }
  };
  
  // Render step navigation
  const renderStepNavigation = () => {
    if (currentStep === 'review' || currentStep === 'success' || 
       (currentStep === 'details' && (paymentMethod === 'crypto' || paymentMethod === 'bank'))) {
      return null;
    }
    
    return (
      <div className="flex justify-between mt-8">
        {currentStep !== 'method' ? (
          <Button 
            variant="secondary" 
            onClick={goToPreviousStep}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </Button>
        ) : (
          <div></div> // Empty div to maintain flex spacing
        )}
        
        {currentStep !== 'details' && (
          <Button 
            onClick={goToNextStep}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            disabled={amount <= 0 && currentStep === 'amount'}
          >
            Continue
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div className="text-sm text-neutral-500">
            Step {['method', 'amount', 'details', 'review'].indexOf(currentStep) + 1} of 4
          </div>
          {onCancel && currentStep !== 'success' && (
            <button 
              onClick={onCancel}
              className="text-sm text-neutral-500 hover:text-neutral-700"
            >
              Cancel
            </button>
          )}
        </div>
        
        <div className="h-1 w-full bg-neutral-200 rounded-full mt-2">
          <div 
            className="h-1 bg-primary-500 rounded-full transition-all duration-300"
            style={{ 
              width: `${((['method', 'amount', 'details', 'review'].indexOf(currentStep) + 1) / 4) * 100}%` 
            }}
          />
        </div>
      </div>
      
      {/* Step content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderStepContent()}
        {renderStepNavigation()}
      </div>
    </div>
  );
};

export default TopUpForm;