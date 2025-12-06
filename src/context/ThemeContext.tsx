import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeColor = 'blue' | 'purple' | 'emerald' | 'rose' | 'amber';
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    accentColor: ThemeColor;
    setAccentColor: (color: ThemeColor) => void;
    fontSize: number;
    setFontSize: (size: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorPalettes: Record<ThemeColor, Record<string, string>> = {
    blue: {
        50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
        500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a'
    },
    purple: {
        50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc',
        500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87'
    },
    emerald: {
        50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399',
        500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b'
    },
    rose: {
        50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185',
        500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337'
    },
    amber: {
        50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
        500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f'
    }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => (localStorage.getItem('themeMode') as ThemeMode) || 'light');
    const [accentColor, setAccentColor] = useState<ThemeColor>(() => (localStorage.getItem('accentColor') as ThemeColor) || 'purple');
    const [fontSize, setFontSize] = useState<number>(() => parseInt(localStorage.getItem('fontSize') || '16'));

    // Initial Load Effect to prevent flicker if possible (though React renders client side anyway)
    useEffect(() => {
        // Apply Font Size
        // 1rem usually equals 16px. Adjusting root font size scales REMs.
        // If standard is 16px (100%), 14px is 87.5%, 18px is 112.5%.
        // Setting absolute pixel value to HTML root works well for scaling Tailwind.
        document.documentElement.style.fontSize = `${fontSize}px`;
        localStorage.setItem('fontSize', fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        // Apply Accent Color Variables
        const palette = colorPalettes[accentColor];
        const root = document.documentElement;
        Object.keys(palette).forEach(key => {
            root.style.setProperty(`--primary-${key}`, palette[key]);
        });
        localStorage.setItem('accentColor', accentColor);
    }, [accentColor]);

    useEffect(() => {
        // Apply Theme Mode (Light/Dark) - Placeholder for now as most UI allows basic 'light' mode
        // Real implementation would toggle 'dark' class on html
        if (themeMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('themeMode', themeMode);
    }, [themeMode]);


    return (
        <ThemeContext.Provider value={{ themeMode, setThemeMode, accentColor, setAccentColor, fontSize, setFontSize }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
