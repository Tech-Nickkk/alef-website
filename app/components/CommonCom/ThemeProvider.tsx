"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("light"); // Default to light

    useEffect(() => {
        // Check localStorage or system preference on mount
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setThemeState(savedTheme);
            updateDocumentElement(savedTheme);
        } else {
            // Default to light
            updateDocumentElement("light");
        }
    }, []);

    const updateDocumentElement = (newTheme: Theme) => {
        // Remove all theme classes first
        document.documentElement.classList.remove("navy");

        // "light" is default (:root no class), "dark" uses .navy class
        if (newTheme === "dark") {
            document.documentElement.classList.add("navy");
        }
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        updateDocumentElement(newTheme);
    };

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
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
