export type PaymentMethod = 'card' | 'crypto' | 'bank';
export type CryptoNetwork = 'ethereum' | 'bsc' | 'polygon' | 'avalanche';
export type CryptoToken = 'USDT' | 'USDC' | 'DAI';
export type FiatCurrency = 'USD' | 'EUR' | 'GBP';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Transaction {
  id: string;
  amount: number;
  amountInCere: number;
  currency: FiatCurrency | CryptoToken;
  method: PaymentMethod;
  network?: CryptoNetwork;
  status: PaymentStatus;
  timestamp: number;
}

export interface Balance {
  available: number;
  pending: number;
}

export interface CardFormData {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

export interface CryptoPaymentDetails {
  token: CryptoToken;
  network: CryptoNetwork;
  address: string;
}

export interface TopUpFormData {
  amount: number;
  method: PaymentMethod;
  currency: FiatCurrency | CryptoToken;
  cardDetails?: CardFormData;
  cryptoDetails?: CryptoPaymentDetails;
}