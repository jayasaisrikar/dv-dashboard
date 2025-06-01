import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

export function truncateText(text: string, maxLength = 30): string {
  if (!text) return 'N/A';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export function getColorByValue(value: number, max = 100): string {
  // Generate color from blue (low) to red (high)
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  if (percentage < 30) return 'bg-blue-100 text-blue-800';
  if (percentage < 60) return 'bg-green-100 text-green-800';
  if (percentage < 80) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}
