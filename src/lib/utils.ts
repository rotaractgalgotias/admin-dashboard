import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a random password of a specified length.
 *
 * @param {number} [length=16] - The length of the password to generate. Defaults to 16 if not specified.
 */
export function generatePassword(length: number = 16) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((n: number) => chars[n % chars.length])
    .join("");
}

/**
 * Retrieves the current year from the environment variable `CURRENT_YEAR`.
 * If the environment variable is not set, it defaults to the current year based on the system date.
 *
 * @constant {number} currentYear - The current year.
 */
export const currentYear =
  Number(process.env.CURRENT_YEAR) || new Date().getFullYear();
