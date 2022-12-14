import { useState, useContext } from "react";
import { UserData } from "./interfaces/interface";
import Searchbar from "./components/Searchbar";
import Header from "./components/Header";
import { ThemeContext } from "./context/ThemeContext";
import "./styles/_main.scss";

const initialUser = {
    name: "",
    login: "",
    public_repos: 0,
    followers: 0,
    following: 0,
    created_at: "",
    location: "",
    url: "",
    avatar_url: "",
    company: "",
    twitter_username: "",
};

function App() {
    const { theme, setTheme, setThemeInStorage } =
        useContext(ThemeContext);
    const [gitHubUser, setGitHubUser] = useState<UserData>(initialUser);
    const {
        name,
        login,
        public_repos,
        followers,
        following,
        created_at,
        location,
        url,
        avatar_url,
        company,
        twitter_username,
    } = gitHubUser;

    function toggleTheme() {
        if (theme === "light") {
            setTheme("dark");
            setThemeInStorage("dark");
            // console.log(theme);
        } else {
            setTheme("light");
            setThemeInStorage("light");
            // console.log(theme);
            // setThemeInStorage(theme);
        }
    }

    function setUser(response) {
        setGitHubUser(response);
    }

    function formatDate() {
        const date = new Date(created_at);
        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric",
        };
        const formattedDate = date
            .toLocaleDateString("en-US", options)
            .split(" ");
        [formattedDate[0], formattedDate[1]] = [
            formattedDate[1],
            formattedDate[0],
        ];
        formattedDate[0] = formattedDate[0].slice(0, 2);
        const result = formattedDate.join(" ");

        return result;
    }

    return (
        <div className={`App ${theme}`}>
            <main className="background">
                <Header toggleTheme={toggleTheme} />
                <Searchbar setUser={setUser} />
                <div>
                    <p>{name}</p>
                    <p>{login}</p>
                    <img
                        className="github-avatar"
                        src={avatar_url}
                        alt={`$Github user ${name}`}
                        width={70}
                    />
                    <span>
                        Joined <span>{formatDate()}</span>
                    </span>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Donec odio. Quisque volutpat mattis eros.
                    </p>
                    <div>
                        <div>
                            <span>Repos </span>
                            {public_repos}
                        </div>
                        <div>
                            <span>Followers </span>
                            {followers}
                        </div>
                        <div>
                            <span>Following </span>
                            {following}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
