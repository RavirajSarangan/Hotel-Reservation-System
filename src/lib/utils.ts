import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function generateReservationNumber(): string {
  const prefix = 'RES';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

export function generateBillNumber(): string {
  const prefix = 'BILL';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getRoleBadgeColor(role: string): string {
  switch (role) {
    case 'super_admin':
      return 'bg-red-100 text-red-800';
    case 'manager':
      return 'bg-purple-100 text-purple-800';
    case 'receptionist':
      return 'bg-blue-100 text-blue-800';
    case 'admin':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'confirmed':
    case 'checked_in':
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
    case 'no_show':
      return 'bg-red-100 text-red-800';
    case 'checked_out':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
