/**
 * Mobile-compatible UUID generator
 * Provides fallback for browsers that don't support crypto.randomUUID()
 */

// Check if crypto.randomUUID is available
const hasNativeCryptoUUID = () => {
  return typeof crypto !== 'undefined' && 
         typeof crypto.randomUUID === 'function';
};

// Fallback UUID generator for mobile browsers
const generateFallbackUUID = (): string => {
  // Use crypto.getRandomValues if available (more secure)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    
    // Set version (4) and variant bits
    array[6] = (array[6] & 0x0f) | 0x40; // Version 4
    array[8] = (array[8] & 0x3f) | 0x80; // Variant 10
    
    // Convert to hex string with proper formatting
    const hex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20, 32)
    ].join('-');
  }
  
  // Final fallback using Math.random (less secure but compatible)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Generate a UUID that works across all browsers
 */
export const generateUUID = (): string => {
  try {
    if (hasNativeCryptoUUID()) {
      return crypto.randomUUID();
    }
  } catch (error) {
    console.warn('crypto.randomUUID failed, using fallback:', error);
  }
  
  return generateFallbackUUID();
};

/**
 * Generate a short ID (for when full UUID isn't needed)
 */
export const generateShortId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    for (let i = 0; i < 8; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    for (let i = 0; i < 8; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  
  return result;
};

export default generateUUID;
