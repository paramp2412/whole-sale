// Currency conversion utilities

// Conversion rate: 1 USD = 75 INR (this is an approximate value)
export const USD_TO_INR_RATE = 75;

/**
 * Convert USD to INR
 * @param {number} usdAmount - Amount in USD
 * @returns {number} - Amount in INR
 */
export const convertUSDtoINR = (usdAmount) => {
  return usdAmount * USD_TO_INR_RATE;
};

/**
 * Format currency in INR with ₹ symbol
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted amount with ₹ symbol
 */
export const formatINR = (amount) => {
  return `₹${amount.toFixed(2)}`;
};

/**
 * Convert USD to INR and format with ₹ symbol
 * @param {number} usdAmount - Amount in USD
 * @returns {string} - Formatted amount in INR with ₹ symbol
 */
export const convertAndFormatINR = (usdAmount) => {
  const inrAmount = convertUSDtoINR(usdAmount);
  return formatINR(inrAmount);
};

/**
 * Convert INR to USD
 * @param {number} inrAmount - Amount in INR
 * @returns {number} - Amount in USD
 */
export const convertINRtoUSD = (inrAmount) => {
  return inrAmount / USD_TO_INR_RATE;
};
