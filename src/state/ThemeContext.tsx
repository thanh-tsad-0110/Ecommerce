/**
 * FILE: state/ThemeContext.tsx
 * GIẢI THÍCH: Context để quản lý theme (Light/Dark mode)
 */

import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useUIStore } from './uiStore';

// Light Theme Colors
export const LIGHT_COLORS = {
    primary: '#FF6B35',
    primaryLight: '#FFB399',
    primaryDark: '#D64423',
    secondary: '#004E89',
    secondaryLight: '#1982C4',
    background: '#FFFFFF',
    backgroundDark: '#F5F5F5',
    backgroundDarker: '#EFEFEF',
    text: '#333333',
    textLight: '#666666',
    textLighter: '#999999',
    textInverse: '#FFFFFF',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
    border: '#E0E0E0',
    shadow: '#000000',
    disabled: '#CCCCCC',
    transparent: 'transparent',
};

// Dark Theme Colors
export const DARK_COLORS = {
    primary: '#FF6B35',
    primaryLight: '#FFB399',
    primaryDark: '#D64423',
    secondary: '#1982C4',
    secondaryLight: '#4A9FD8',
    background: '#121212',        // Nền đen
    backgroundDark: '#1E1E1E',    // Nền xám đậm
    backgroundDarker: '#2A2A2A',  // Nền xám đậm hơn
    text: '#FFFFFF',              // Text trắng
    textLight: '#B0B0B0',         // Text xám nhạt
    textLighter: '#808080',       // Text xám đậm
    textInverse: '#000000',       // Text đen (trên nền sáng)
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
    border: '#3A3A3A',            // Viền xám đậm
    shadow: '#000000',
    disabled: '#555555',
    transparent: 'transparent',
};

interface ThemeContextType {
    colors: typeof LIGHT_COLORS;
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { theme, toggleTheme } = useUIStore();
    const isDark = theme === 'dark';

    const value: ThemeContextType = useMemo(() => ({
        colors: isDark ? DARK_COLORS : LIGHT_COLORS,
        isDark,
        toggleTheme,
    }), [isDark, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme phải được dùng bên trong ThemeProvider');
    }

    return context;
};

export default ThemeContext;
