import React, { ReactNode } from 'react';
import { useFavoritesStore } from './favoritesStore';
import { Product } from '../types';

interface FavoritesContextType {
  items: Product[];
  isLoading: boolean;
  error: string | null;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  clearFavorites: () => void;
  isFavorite: (productId: string) => boolean;
}

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

export const useFavorites = (): FavoritesContextType => {
  return useFavoritesStore((state) => ({
    items: state.items,
    isLoading: state.isLoading,
    error: state.error,
    addToFavorites: state.add,
    removeFromFavorites: state.remove,
    clearFavorites: state.clear,
    isFavorite: state.isFavorite,
  }));
};

export default FavoritesProvider;
