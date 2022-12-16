import { createContext, useState } from "react";

type ThemeContextProviderProps = {
    children: React.ReactNode;
};

interface ThemeContextInterface {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    setThemeInStorage: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextInterface | any>({
    theme: "light",
});

export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
    const [theme, setTheme] = useState<string>(() => {
        const valueInLocalStorage = window.localStorage.getItem("theme");
        return valueInLocalStorage ? valueInLocalStorage : "light";
    });

    const setThemeInStorage = (theme: string) => {
        localStorage.setItem("theme", theme);
    };

    return (
        <ThemeContext.Provider
            value={{ theme, setTheme, setThemeInStorage }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
