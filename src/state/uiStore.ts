import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

type ThemeMode = 'light' | 'dark';

interface UIState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
    }),
    {
      name: 'ui-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
