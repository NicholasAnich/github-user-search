import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styles from "./header.module.scss";

type Toggler = {
    toggleTheme: () => void;
};

function Header({ toggleTheme }: Toggler) {
    const { theme } = useContext(ThemeContext);

    function modeHandler() {
        return theme === "light" ? "moon" : "sun";
    }

    return (
        <header className={`${styles.header} ${styles[theme]}`}>
            <h1>devfinder</h1>
            <span onClick={toggleTheme}>
                <div className={styles.themeToggle}>
                    <span className={styles.themeTitle}>
                        {theme === "light" ? "DARK" : "LIGHT"}
                    </span>
                    <img
                        className={styles.icon}
                        src={`/assets/icon-${modeHandler()}.svg`}
                        alt={`${theme}-mode ${modeHandler()} icon`}
                    />
                </div>
            </span>
        </header>
    );
}

export default Header;
