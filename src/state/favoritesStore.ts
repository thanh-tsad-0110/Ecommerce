import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types';
import { mmkvStorage } from './storage';

interface FavoritesState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
  add: (product: Product) => void;
  remove: (productId: string) => void;
  clear: () => void;
  isFavorite: (productId: string) => boolean;
  setLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      add: (product) => {
        if (get().items.find((p) => p.id === product.id)) return;
        set({ items: [...get().items, { ...product, isFavorite: true }], error: null });
      },
      remove: (productId) => {
        set({ items: get().items.filter((p) => p.id !== productId) });
      },
      clear: () => set({ items: [] }),
      isFavorite: (productId) => get().items.some((p) => p.id === productId),
      setLoading: (value) => set({ isLoading: value }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'favorites-store',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
