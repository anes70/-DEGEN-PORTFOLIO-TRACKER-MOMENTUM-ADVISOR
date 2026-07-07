export type SignalType =
  | 'PARABOLIC_RUN'
  | 'GOLDEN_RULE'
  | 'HEALTHY_PULLBACK'
  | 'LIQUIDITY_TRAP'
  | 'VOLUME_EXPLOSION'
  | 'CAPITULATION'
  | 'WHALE_ACCUMULATION'
  | 'EXIT_LIQUIDITY'
  | 'FAKE_BREAKOUT'
  | 'SHORT_SQUEEZE'
  | 'DEAD_TOKEN'
  | 'STRONG_RECOVERY'
  | 'DISTRIBUTION_PHASE'
  | 'SMART_MONEY_ENTRY'
  | 'CONSOLIDATION'
  | 'PRICE_DISCOVERY';

export interface AdvisorSignal {
  type: SignalType;
  label: string;
  color: string;       // Code couleur hex ou classe Tailwind (ex: '#00ffcc' / 'text-emerald-400')
  badgeBg: string;     // Couleur d'arrière-plan du badge UI
  icon: string;        // Nom de l'icône Lucide React utilisable dynamiquement
  score: number;       // Score global calculé (0-100)
  explanation: string; // Conseil clair orienté action
  reasons: string[];   // Liste des arguments analytiques identifiés
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
}
