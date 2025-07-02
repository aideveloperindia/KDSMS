import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatPerformance = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const parseCurrencyToNumber = (currencyString: string): number => {
  return parseInt(currencyString.replace('₹', '').replace(/,/g, ''), 10);
};

// For development/testing purposes, accept static OTP
export const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
  // In production, implement actual OTP verification logic
  // For now, accept static OTP: 123456
  return otp === '123456';
}; 