import React, { useState } from 'react';
import { User, CreditCard, Calendar, KeyRound } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { CardFormData } from '../../types';

interface CardPaymentFormProps {
  onSubmit: (cardData: CardFormData) => void;
  isProcessing: boolean;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({ onSubmit, isProcessing }) => {
  const [cardData, setCardData] = useState<CardFormData>({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
  });
  
  const [errors, setErrors] = useState<Partial<CardFormData>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === 'number') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }
    
    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }
    
    // Format CVC
    if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setCardData(prev => ({ ...prev, [name]: formattedValue }));
    
    // Clear error for this field
    if (errors[name as keyof CardFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<CardFormData> = {};
    
    if (!cardData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!cardData.number.trim()) {
      newErrors.number = 'Card number is required';
    } else if (cardData.number.replace(/\s/g, '').length < 16) {
      newErrors.number = 'Card number must be 16 digits';
    }
    
    if (!cardData.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = 'Invalid format (MM/YY)';
    }
    
    if (!cardData.cvc.trim()) {
      newErrors.cvc = 'CVC is required';
    } else if (cardData.cvc.length < 3) {
      newErrors.cvc = 'CVC must be 3 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(cardData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-medium text-neutral-900">Payment Details</h3>
      
      <div className="space-y-4">
        <Input
          label="Cardholder Name"
          name="name"
          placeholder="John Doe"
          value={cardData.name}
          onChange={handleChange}
          leftIcon={<User className="h-4 w-4" />}
          error={errors.name}
        />
        
        <Input
          label="Card Number"
          name="number"
          placeholder="4242 4242 4242 4242"
          value={cardData.number}
          onChange={handleChange}
          leftIcon={<CreditCard className="h-4 w-4" />}
          error={errors.number}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            name="expiry"
            placeholder="MM/YY"
            value={cardData.expiry}
            onChange={handleChange}
            leftIcon={<Calendar className="h-4 w-4" />}
            error={errors.expiry}
          />
          
          <Input
            label="CVC"
            name="cvc"
            placeholder="123"
            value={cardData.cvc}
            onChange={handleChange}
            leftIcon={<KeyRound className="h-4 w-4" />}
            error={errors.cvc}
          />
        </div>
      </div>
      
      <div className="pt-2">
        <Button 
          type="submit"
          isLoading={isProcessing}
          fullWidth
        >
          Pay Now
        </Button>
      </div>
    </form>
  );
};

export default CardPaymentForm;