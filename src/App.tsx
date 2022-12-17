import { useState, useContext } from "react";
import { UserData } from "./interfaces/interface";
import Searchbar from "./components/Searchbar";
import Header from "./components/Header";
import { ThemeContext } from "./context/ThemeContext";
import UserInfo from "./components/UserInfo";
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
    blog: "",
};

function App() {
    const { theme, setTheme, setThemeInStorage } =
        useContext(ThemeContext);

    const [gitHubUser, setGitHubUser] = useState<UserData>(initialUser);

    function toggleTheme() {
        if (theme === "light") {
            setTheme("dark");
            setThemeInStorage("dark");
        } else {
            setTheme("light");
            setThemeInStorage("light");
        }
    }

    function setUser(response: UserData) {
        setGitHubUser(response);
    }

    return (
        <div className={`App ${theme}-background app-container`}>
            <div className={`${theme} main-container`}>
                <Header toggleTheme={toggleTheme} />
                <main className="background">
                    <Searchbar setUser={setUser} />
                    <UserInfo user={gitHubUser} />
                </main>
            </div>
        </div>
    );
}

export default App;
