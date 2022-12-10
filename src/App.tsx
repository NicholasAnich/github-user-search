import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import "./App.css";

interface UserData {
    name: string;
    login: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    location: string;
    url: string;
    avatar_url: string;
    company: string;
    twitter_username: string;
}

function App() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [userName, setUserName] = useState<string>("octocat");
    const [gitHubUser, setGitHubUser] = useState<UserData>({
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
    });

    const { name, login, public_repos, followers, following, created_at, location, url, avatar_url, company, twitter_username } = gitHubUser;
    let query = `https://api.github.com/users/${userName}`;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    async function getUser() {
        const response = await axios.get(query).then(({ data }) => data);
        setGitHubUser(response);
    }

    function handleSubmit() {
        setUserName(searchTerm);
        getUser();
    }

    console.log(gitHubUser);
    useEffect(() => {
        if (userName === "") return;
        let mounted = true;
        let prevUserName = userName;

        async function getUserData() {
            const response = await axios.get(query).then(({ data }) => {
                return data;
            });

            setGitHubUser(response);
        }

        getUserData();
    }, []);
    return (
        <div className="App">
            <main>
                <h1>Github User Search</h1>
                <label htmlFor="search">username</label>
                <input id="search" type="text" onChange={handleChange} value={searchTerm} />
                <button onClick={handleSubmit}>Search</button>
            </main>
        </div>
    );
}

export default App;
