import React, { ReactNode } from 'react';
import { useUserStore } from './userStore';
import { User, Address, PaymentMethod } from '../types';

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  loginSuccess: (user: User) => void;
  logout: () => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

export const useUser = (): UserContextType => {
  return useUserStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    setUser: state.setUser,
    updateUser: state.updateUser,
    loginSuccess: state.loginSuccess,
    logout: state.logout,
    addAddress: state.addAddress,
    removeAddress: state.removeAddress,
    addPaymentMethod: state.addPaymentMethod,
    removePaymentMethod: state.removePaymentMethod,
  }));
};

export default UserProvider;
