export type Network = 'solana' | 'base';

export interface TokenMarketData {
  currentPrice: number;
  volume24h: number;
  volumeChange1h: number; // Delta volume 1h en %
  liquidity: number;
  ath: number;
  // Métriques on-chain additionnelles pour le scoreEngine
  holderCount: number;
  top10HolderShare: number; // en % (ex: 35 pour 35%)
  ageInDays: number;
  txCount24h: number;
  githubCommits30d: number;
  socialSentimentScore: number; // 0-100
  rugPullRiskScore: number; // 0-100 (bas lié au risque)
}

export interface Token {
  id: string; // Combinaison réseau + mint address
  name: string;
  symbol: string;
  mintAddress: string;
  network: Network;
  balance: number;
  decimals: number;
  entryPrice: number; // Modifiable manuellement par l'utilisateur
  marketData: TokenMarketData;
}
