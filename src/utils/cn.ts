import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Uses clsx for conditional class joining and tailwind-merge
 * for deduplicating conflicting Tailwind utilities.
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue text-white', className)
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
