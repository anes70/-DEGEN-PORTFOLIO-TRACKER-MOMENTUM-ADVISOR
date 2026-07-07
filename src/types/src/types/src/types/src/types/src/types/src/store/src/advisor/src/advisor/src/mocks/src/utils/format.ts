/**
 * Formate les prix de manière intelligente.
 * Si le prix est < 1$, affiche jusqu'à 6 décimales pour capter la micro-valeur des tokens volatils.
 * Sinon, affiche 2 décimales classiques.
 */
export const formatPrice = (price: number): string => {
  if (price === 0) return '$0.00';
  if (price < 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 6,
    }).format(price);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Formate les gros volumes ou liquidités (ex: 18400000 -> $18.40M)
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
  return `$${num.toFixed(2)}`;
};

/**
 * Formate les pourcentages avec le signe + ou - explicite (ex: +142% ou -35%)
 */
export const formatPercentage = (num: number): string => {
  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
};

/**
 * Trunque une adresse blockchain pour l'UI (ex: 0x420000...0022 ou ansem...112)
 */
export const truncateAddress = (address: string): string => {
  if (!address) return '';
  if (address.startsWith('0x')) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
  // Format Solana standard (Base58)
  return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
};
