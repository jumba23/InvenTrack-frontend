// utils/formatPhoneNumber.js

/**
 * Format a phone number as (123) 456-7890
 *
 * @param {string} phone - The phone number to format
 * @returns {string} The formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters
  const cleaned = ("" + phone).replace(/\D/g, "");

  // Ensure the cleaned phone number has exactly 10 digits
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  // If match is found, format the number as (123) 234-3456
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // If no match, return the original phone number
  return phone;
};
