import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '../types';
import { mmkvStorage } from './storage';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  setLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
}

const recalcTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isLoading: false,
      error: null,
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        let updated: CartItem[];
        if (existing) {
          updated = get().items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          );
        } else {
          updated = [...get().items, item];
        }
        const { totalItems, totalPrice } = recalcTotals(updated);
        set({ items: updated, totalItems, totalPrice, error: null });
      },
      removeItem: (id) => {
        const updated = get().items.filter((i) => i.id !== id);
        const { totalItems, totalPrice } = recalcTotals(updated);
        set({ items: updated, totalItems, totalPrice });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          const updated = get().items.filter((i) => i.id !== id);
          const { totalItems, totalPrice } = recalcTotals(updated);
          set({ items: updated, totalItems, totalPrice });
          return;
        }
        const updated = get().items.map((i) => (i.id === id ? { ...i, quantity } : i));
        const { totalItems, totalPrice } = recalcTotals(updated);
        set({ items: updated, totalItems, totalPrice });
      },
      clear: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
      setLoading: (value) => set({ isLoading: value }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({ items: state.items, totalItems: state.totalItems, totalPrice: state.totalPrice }),
    }
  )
);
