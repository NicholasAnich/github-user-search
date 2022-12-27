import {
    useState,
    useEffect,
    useContext,
    useRef,
    SyntheticEvent,
} from "react";
import { UserData } from "../interfaces/interface";
import axios from "axios";
import searchIcon from "/assets/icon-search.svg";
import styles from "./searchbar.module.scss";
import { ThemeContext } from "../context/ThemeContext";

interface Errors {
    message: string;
}

export default function Searchbar({
    setUser,
    setError,
    setLoadingScreen,
}: {
    setUser: (response: UserData) => void;
    setError: (message: Errors | null) => void;
    setLoadingScreen: (load: boolean) => void;
}) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [userName, setUserName] = useState<string>("octocat");
    const [noUser, setNoUser] = useState<Errors | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme } = useContext(ThemeContext);

    let query = `https://api.github.com/users/${userName}`;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        if (searchTerm === userName) {
            return;
        } else {
            setNoUser(null);
            setError(null);
            setUserName(searchTerm);
        }
    }

    function handleClick() {
        inputRef.current?.focus();
    }

    useEffect(() => {
        setLoadingScreen(true);
        async function getUserData() {
            try {
                const response = await axios
                    .get(query)
                    .then(({ data }) => {
                        return data;
                    });
                setUser(response);
                setLoadingScreen(false);
            } catch (err) {
                setError({ message: "User does not exist" });
                setNoUser({ message: "User does not exist" });
                setLoadingScreen(false);
            }
        }
        getUserData();
    }, [userName]);

    return (
        <form
            role="search"
            className={`${styles[theme]} ${styles.container}`}
            onSubmit={handleSubmit}
            onClick={handleClick}
        >
            <div className={styles.search}>
                <img
                    src={searchIcon}
                    alt="Search GitHub User"
                    className={styles.img}
                    width="20"
                    height="20"
                />
                <input
                    className={styles.input}
                    id="search_2"
                    type="search"
                    placeholder="Search GitHub username..."
                    onChange={handleChange}
                    value={searchTerm}
                    title="Enter a username"
                    ref={inputRef}
                    required
                />
            </div>
            {noUser !== null && (
                <span className={styles.errorMessage}>No results</span>
            )}
            <button
                type="submit"
                className={`${styles.btn} ${
                    noUser !== null && styles.hasError
                }`}
            >
                Search
            </button>
        </form>
    );
}
