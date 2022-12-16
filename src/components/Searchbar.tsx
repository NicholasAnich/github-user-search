import { useState, useEffect, useContext } from "react";
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

    function handleSubmit() {
        setUserName(searchTerm);
    }

    useEffect(() => {
        async function getUserData() {
            const response = await axios.get(query).then(({ data }) => {
                console.log(data);
                return data;
            });
            setUser(response);
        }
        getUserData();
    }, [userName]);

    return (
        <div className={`${styles[theme]} ${styles.container}`}>
            <label htmlFor="search">
                <img src={searchIcon} alt="search icon" />
            </label>
            <input
                className={styles.input}
                id="search"
                type="text"
                placeholder="Search GitHub username..."
                onChange={handleChange}
                value={searchTerm}
            />
            <button className={styles.btn} onClick={handleSubmit}>
                Search
            </button>
        </div>
    );
}
