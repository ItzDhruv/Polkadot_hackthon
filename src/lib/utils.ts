import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatCryptoCurrency(amount: number, symbol = 'CERE') {
  return `${amount.toFixed(4)} ${symbol}`;
}

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  const start = address.substring(0, chars + 2);
  const end = address.substring(address.length - chars);
  return `${start}...${end}`;
}

export function generateTransactionId(): string {
  return `tx-${Math.random().toString(36).substring(2, 10)}`;
}

export function getRandomAmount(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

export function getCereAmount(usdAmount: number, cerePrice = 0.05): number {
  return usdAmount / cerePrice;
}

export function getTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} min ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} days ago`;
  
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}