/**
 * FILE: state/FavoritesContext.tsx
 * GIẢI THÍCH: Context để quản lý danh sách sản phẩm yêu thích
 */

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { Product } from '../types';

interface FavoritesState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}

type FavoritesAction =
  | { type: 'ADD_TO_FAVORITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'CLEAR_FAVORITES' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: FavoritesState = {
  items: [],
  isLoading: false,
  error: null,
};

const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES': {
      // Kiểm tra xem đã có trong favorites chưa
      if (state.items.find((item) => item.id === action.payload.id)) {
        return state; // Đã có rồi, không thêm
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, isFavorite: true }],
        error: null,
      };
    }

    case 'REMOVE_FROM_FAVORITES': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case 'CLEAR_FAVORITES': {
      return {
        ...state,
        items: [],
      };
    }

    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

interface FavoritesContextType extends FavoritesState {
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  clearFavorites: () => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addToFavorites = useCallback((product: Product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
  }, []);

  const removeFromFavorites = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
  }, []);

  const clearFavorites = useCallback(() => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  }, []);

  const isFavorite = useCallback(
    (productId: string) => state.items.some((item) => item.id === productId),
    [state.items]
  );

  const value: FavoritesContextType = {
    ...state,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites phải được dùng bên trong FavoritesProvider');
  }

  return context;
};

export default FavoritesContext;
