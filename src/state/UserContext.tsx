/**
 * FILE: state/UserContext.tsx
 * GIẢI THÍCH: Context để quản lý thông tin user (đăng nhập, profile, ...)
 */

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { User, Address, PaymentMethod } from '../types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type UserAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_ADDRESS'; payload: Address }
  | { type: 'UPDATE_ADDRESS'; payload: { id: string; address: Address } }
  | { type: 'REMOVE_ADDRESS'; payload: string }
  | { type: 'ADD_PAYMENT_METHOD'; payload: PaymentMethod }
  | { type: 'UPDATE_PAYMENT_METHOD'; payload: { id: string; method: PaymentMethod } }
  | { type: 'REMOVE_PAYMENT_METHOD'; payload: string };

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    }

    case 'UPDATE_USER': {
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        error: null,
      };
    }

    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
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

    case 'ADD_ADDRESS': {
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          addresses: [...state.user.addresses, action.payload],
        },
      };
    }

    case 'UPDATE_ADDRESS': {
      if (!state.user) return state;
      const { id, address } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          addresses: state.user.addresses.map((addr) =>
            addr.id === id ? { ...address, id } : addr
          ),
        },
      };
    }

    case 'REMOVE_ADDRESS': {
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          addresses: state.user.addresses.filter((addr) => addr.id !== action.payload),
        },
      };
    }

    case 'ADD_PAYMENT_METHOD': {
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          paymentMethods: [...state.user.paymentMethods, action.payload],
        },
      };
    }

    case 'UPDATE_PAYMENT_METHOD': {
      if (!state.user) return state;
      const { id, method } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          paymentMethods: state.user.paymentMethods.map((pm) =>
            pm.id === id ? { ...method, id } : pm
          ),
        },
      };
    }

    case 'REMOVE_PAYMENT_METHOD': {
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          paymentMethods: state.user.paymentMethods.filter(
            (pm) => pm.id !== action.payload
          ),
        },
      };
    }

    default:
      return state;
  }
};

interface UserContextType extends UserState {
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  loginSuccess: (user: User) => void;
  logout: () => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = useCallback((user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  }, []);

  const loginSuccess = useCallback((user: User) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const addAddress = useCallback((address: Address) => {
    dispatch({ type: 'ADD_ADDRESS', payload: address });
  }, []);

  const removeAddress = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ADDRESS', payload: id });
  }, []);

  const addPaymentMethod = useCallback((method: PaymentMethod) => {
    dispatch({ type: 'ADD_PAYMENT_METHOD', payload: method });
  }, []);

  const removePaymentMethod = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_PAYMENT_METHOD', payload: id });
  }, []);

  const value: UserContextType = {
    ...state,
    setUser,
    updateUser,
    loginSuccess,
    logout,
    addAddress,
    removeAddress,
    addPaymentMethod,
    removePaymentMethod,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser phải được dùng bên trong UserProvider');
  }

  return context;
};

export default UserContext;
