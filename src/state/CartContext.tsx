import React, { ReactNode } from 'react';
import { useCartStore } from './cartStore';
import { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// No-op provider to preserve existing component tree API
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

export const useCart = (): CartContextType => {
  return useCartStore((state) => ({
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    isLoading: state.isLoading,
    error: state.error,
    addToCart: state.addItem,
    removeFromCart: state.removeItem,
    updateQuantity: state.updateQuantity,
    clearCart: state.clear,
  }));
};

export default CartProvider;
