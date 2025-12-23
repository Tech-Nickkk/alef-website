"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "navy";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("dark");

    useEffect(() => {
        // Check localStorage or system preference on mount
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setThemeState(savedTheme);
            updateDocumentElement(savedTheme);
        } else {
            // Default to dark
            updateDocumentElement("dark");
        }
    }, []);

    const updateDocumentElement = (newTheme: Theme) => {
        // Remove all theme classes first
        document.documentElement.classList.remove("light", "navy");

        // Add specific theme class if needed
        if (newTheme === "light") {
            document.documentElement.classList.add("light");
        } else if (newTheme === "navy") {
            document.documentElement.classList.add("navy");
        }
        // "dark" is default (no class or default vars)
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        updateDocumentElement(newTheme);
    };

    const toggleTheme = () => {
        const themes: Theme[] = ["dark", "light", "navy"];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
