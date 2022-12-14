import { createContext, useState } from "react";

export const ThemeContext = createContext<any>({
    theme: "light",
    undefined,
});

export const ThemeProvider: React.FC<{}> = ({ children }) => {
    // const [theme, setTheme] = useState("light");
    const [theme, setTheme] = useState(() => {
        const valueInLocalStorage = window.localStorage.getItem("theme");
        if (valueInLocalStorage) {
            return valueInLocalStorage;
        } else {
            return "light";
        }
    });

    const setThemeInStorage = (theme) => {
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
