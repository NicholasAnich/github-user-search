import { useState, useEffect, useContext, SyntheticEvent } from "react";
import { UserData } from "../interfaces/interface";
import axios from "axios";
import searchIcon from "/assets/icon-search.svg";
import styles from "./searchbar.module.scss";
import { ThemeContext } from "../context/ThemeContext";

export default function Searchbar({
    setUser,
}: {
    setUser: (response: UserData) => void;
}) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [userName, setUserName] = useState<string>("octocat");
    const { theme } = useContext(ThemeContext);

    let query = `https://api.github.com/users/${userName}`;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        setUserName(searchTerm);
    }

    useEffect(() => {
        async function getUserData() {
            const response = await axios.get(query).then(({ data }) => {
                return data;
            });
            setUser(response);
        }
        getUserData();
    }, [userName]);

    return (
        <form
            role="search"
            className={`${styles[theme]} ${styles.container}`}
            onSubmit={handleSubmit}
        >
            <label htmlFor="search_2" className={styles.image}>
                <img
                    src={searchIcon}
                    alt="Search GitHub User"
                    className={styles.img}
                    width="20"
                    height="20"
                />
            </label>
            <input
                className={styles.input}
                id="search_2"
                type="search"
                placeholder="Search GitHub username..."
                onChange={handleChange}
                value={searchTerm}
            />
            <button type="submit" className={styles.btn}>
                Search
            </button>
        </form>
    );
}
