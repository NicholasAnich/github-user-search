import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Header({ toggleTheme }) {
    const { theme } = useContext(ThemeContext);
    // console.log(theme);
    return (
        <div>
            <h1>devfinder</h1>
            <span onClick={toggleTheme}>
                {theme === "light" ? (
                    <img
                        src="./public/assets/icon-moon.svg"
                        alt="dark-mode moon icon"
                    />
                ) : (
                    <img
                        src="./public/assets/icon-sun.svg"
                        alt="light-mode sun icon"
                    />
                )}
            </span>
        </div>
    );
}

export default Header;
