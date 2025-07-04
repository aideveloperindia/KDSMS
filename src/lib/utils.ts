import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Consistent number formatting function to avoid hydration errors
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCurrency = (amount: number): string => {
  return `₹${formatNumber(amount)}`;
};

export const formatQuantity = (quantity: number): string => {
  return `${quantity.toFixed(1)}L`;
};

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (date: Date | string): string => {
  return new Date(date).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateZoneFromArea = (area: number): number => {
  return Math.ceil(area / 4);
};

export const calculateAreaFromSubArea = (subArea: number): number => {
  return Math.ceil(subArea / 20);
};

export const validateHierarchy = (zone?: number, area?: number, subArea?: number): boolean => {
  if (!zone) return true;
  if (zone < 1 || zone > 6) return false;

  if (!area) return true;
  if (area < 1 || area > 24) return false;
  const expectedZone = calculateZoneFromArea(area);
  if (zone !== expectedZone) return false;

  if (!subArea) return true;
  if (subArea < 1 || subArea > 480) return false;
  const expectedArea = calculateAreaFromSubArea(subArea);
  return area === expectedArea;
};

export const getSubAreasForArea = (area: number): number[] => {
  const start = (area - 1) * 20 + 1;
  return Array.from({ length: 20 }, (_, i) => start + i);
};

export const getAreasForZone = (zone: number): number[] => {
  const start = (zone - 1) * 4 + 1;
  return Array.from({ length: 4 }, (_, i) => start + i);
};

export const getAgentsForExecutive = (area: number): number[] => {
  return getSubAreasForArea(area);
};

export const getExecutivesForZM = (zone: number): number[] => {
  return getAreasForZone(zone);
};

export const getZonesForAGM = (): number[] => {
  return Array.from({ length: 6 }, (_, i) => i + 1);
};

export const getRoleBasedRedirectPath = (role: string): string => {
  const roleMap: { [key: string]: string } = {
    'agent': '/agents',
    'executive': '/agents',
    'zm': '/zm',
    'agm': '/agm',
    'management': '/management'
  };
  return roleMap[role] || '/agents';
};

export const canAccessArea = (userRole: string, userArea: number | undefined, targetArea: number): boolean => {
  if (!userArea) return false;
  if (userRole === 'agent') return userArea === targetArea;
  if (userRole === 'executive') return userArea === targetArea;
  if (userRole === 'zm') {
    const userZone = calculateZoneFromArea(userArea);
    const targetZone = calculateZoneFromArea(targetArea);
    return userZone === targetZone;
  }
  return ['agm', 'management'].includes(userRole);
};

export const canAccessZone = (userRole: string, userZone: number | undefined, targetZone: number): boolean => {
  if (!userZone) return false;
  if (userRole === 'agent' || userRole === 'executive') return userZone === targetZone;
  if (userRole === 'zm') return userZone === targetZone;
  return ['agm', 'management'].includes(userRole);
};

export const canAccessSubArea = (userRole: string, userSubArea: number | undefined, targetSubArea: number): boolean => {
  if (!userSubArea) return false;
  if (userRole === 'agent') return userSubArea === targetSubArea;
  if (userRole === 'executive') {
    const userArea = calculateAreaFromSubArea(userSubArea);
    const targetArea = calculateAreaFromSubArea(targetSubArea);
    return userArea === targetArea;
  }
  if (userRole === 'zm') {
    const userZone = calculateZoneFromArea(calculateAreaFromSubArea(userSubArea));
    const targetZone = calculateZoneFromArea(calculateAreaFromSubArea(targetSubArea));
    return userZone === targetZone;
  }
  return ['agm', 'management'].includes(userRole);
}; 