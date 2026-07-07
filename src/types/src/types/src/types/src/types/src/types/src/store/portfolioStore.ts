import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Token, Network } from '../types/token';
import { getMockWalletAssets } from '../mocks/wallets';

interface PortfolioState {
  wallets: Record<Network, string>;
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setWalletAddress: (network: Network, address: string) => void;
  updateEntryPrice: (tokenId: string, price: number) => void;
  refreshPortfolio: () => Promise<void>;
  clearPortfolio: () => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      wallets: {
        solana: '',
        base: '',
      },
      tokens: [],
      isLoading: false,
      error: null,

      setWalletAddress: (network, address) => {
        set((state) => ({
          wallets: { ...state.wallets, [network]: address }
        }));
        // Déclencher le rechargement automatique dès qu'un wallet change
        get().refreshPortfolio();
      },

      updateEntryPrice: (tokenId, price) => {
        set((state) => ({
          tokens: state.tokens.map((token) =>
            token.id === tokenId ? { ...token, entryPrice: Math.max(0, price) } : token
          ),
        }));
      },

      refreshPortfolio: async () => {
        const { wallets, tokens: currentTokens } = get();
        if (!wallets.solana && !wallets.base) {
          set({ tokens: [], error: null });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          // Simulation de latence réseau de 1.2s
          await new Promise((resolve) => setTimeout(resolve, 1200));

          let fetchedTokens: Token[] = [];

          // Récupération des données simulées (qui respectent la structure Helius/Alchemy à terme)
          if (wallets.solana) {
            const solAssets = getMockWalletAssets(wallets.solana, 'solana');
            fetchedTokens = [...fetchedTokens, ...solAssets];
          }
          if (wallets.base) {
            const baseAssets = getMockWalletAssets(wallets.base, 'base');
            fetchedTokens = [...fetchedTokens, ...baseAssets];
          }

          // Conservation des prix d'entrée customisés par l'utilisateur si le token existait déjà
          const finalTokens = fetchedTokens.map((newToken) => {
            const existingToken = currentTokens.find((t) => t.id === newToken.id);
            return existingToken
              ? { ...newToken, entryPrice: existingToken.entryPrice }
              : newToken;
          });

          set({ tokens: finalTokens, isLoading: false });
        } catch (err: any) {
          set({ error: err.message || 'Erreur lors du fetching du portfolio', isLoading: false });
        }
      },

      clearPortfolio: () => {
        set({
          wallets: { solana: '', base: '' },
          tokens: [],
          error: null,
        });
      },
    }),
    {
      name: 'degen-portfolio-storage',
      partialize: (state) => ({
        wallets: state.wallets,
        // Sauvegarde uniquement des couples ID-entryPrice pour ne pas surcharger le localStorage
        tokens: state.tokens.map(t => ({ id: t.id, entryPrice: t.entryPrice }))
      }),
      merge: (persistedState: any, currentState) => {
        // Logique de fusion adaptative lors du rechargement de la page
        const wallets = persistedState?.wallets || currentState.wallets;
        return {
          ...currentState,
          wallets,
          // Les tokens seront hydratés à la volée par le premier refreshPortfolio du cycle de vie UI
          tokens: [] 
        };
      }
    }
  )
);
