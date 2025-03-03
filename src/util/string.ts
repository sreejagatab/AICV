/**
 * Capitalizes the first letter of each word in a string.
 * @param str The input string to be capitalized.
 * @returns A new string with the first letter of each word capitalized.
 */
export function capitalizeWords(str: string): string {
  if (!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
* Truncates a string to a specified length and adds an ellipsis if truncated.
* @param str The input string to be truncated.
* @param maxLength The maximum length of the truncated string (including ellipsis).
* @returns A truncated string with ellipsis if necessary.
*/
export function truncateString(str: string, maxLength: number): string {
  if (!str) return '';
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
}

/**
* Removes all whitespace from a string.
* @param str The input string to remove whitespace from.
* @returns A new string with all whitespace removed.
*/
export function removeWhitespace(str: string): string {
  if (!str) return '';
  return str.replace(/\s/g, '');
}

/**
 * Formats a date string to a readable format
 * @param dateString - ISO date string
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string, 
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Converts a string to kebab-case (for URLs, IDs, etc.)
 * @param str - The string to convert
 * @returns Kebab-case string
 */
export const toKebabCase = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Extracts the first name from a full name
 * @param fullName - The full name
 * @returns The first name
 */
export const extractFirstName = (fullName: string): string => {
  if (!fullName) return '';
  return fullName.split(' ')[0];
};

/**
 * Creates a safe filename from a string (removes special characters)
 * @param str - The string to convert to a safe filename
 * @returns Safe filename string
 */
export const createSafeFilename = (str: string): string => {
  if (!str) return 'file';
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
};
