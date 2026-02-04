import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Address, PaymentMethod } from '../types';
import { mmkvStorage } from './storage';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  loginSuccess: (user: User) => void;
  logout: () => void;
  addAddress: (address: Address) => void;
  updateAddress: (id: string, address: Address) => void;
  removeAddress: (id: string) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  updatePaymentMethod: (id: string, method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
  setLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user, isAuthenticated: true, error: null }),
      updateUser: (updates) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...updates }, error: null });
      },
      loginSuccess: (user) => set({ user, isAuthenticated: true, error: null }),
      logout: () => set({ user: null, isAuthenticated: false, error: null }),
      addAddress: (address) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, addresses: [...current.addresses, address] } });
      },
      updateAddress: (id, address) => {
        const current = get().user;
        if (!current) return;
        set({
          user: {
            ...current,
            addresses: current.addresses.map((addr) => (addr.id === id ? { ...address, id } : addr)),
          },
        });
      },
      removeAddress: (id) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, addresses: current.addresses.filter((addr) => addr.id !== id) } });
      },
      addPaymentMethod: (method) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, paymentMethods: [...current.paymentMethods, method] } });
      },
      updatePaymentMethod: (id, method) => {
        const current = get().user;
        if (!current) return;
        set({
          user: {
            ...current,
            paymentMethods: current.paymentMethods.map((pm) => (pm.id === id ? { ...method, id } : pm)),
          },
        });
      },
      removePaymentMethod: (id) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, paymentMethods: current.paymentMethods.filter((pm) => pm.id !== id) } });
      },
      setLoading: (value) => set({ isLoading: value }),
      setError: (value) => set({ error: value }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
