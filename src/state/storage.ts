import { MMKV } from 'react-native-mmkv';

// Shared MMKV instance for persisted Zustand stores
export const mmkv = new MMKV({ id: 'ecommerce-storage' });

export const mmkvStorage = {
  getItem: (key: string): string | null => {
    const value = mmkv.getString(key);
    return value ?? null;
  },
  setItem: (key: string, value: string): void => {
    mmkv.set(key, value);
  },
  removeItem: (key: string): void => {
    mmkv.delete(key);
  },
};
