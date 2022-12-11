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

    function handleSubmit() {
        setUserName(searchTerm);
    }

    function formatDate() {
        const date = new Date(created_at);
        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric",
        };
        const formattedDate = date.toLocaleDateString("en-US", options).split(" ");
        [formattedDate[0], formattedDate[1]] = [formattedDate[1], formattedDate[0]];
        formattedDate[0] = formattedDate[0].slice(0, 2);
        const result = formattedDate.join(" ");

        return result;
    }

    useEffect(() => {
        async function getUserData() {
            const response = await axios.get(query).then(({ data }) => {
                console.log(data);
                return data;
            });
            setGitHubUser(response);
        }
        getUserData();
    }, [userName]);

    return (
        <div className="App">
            <main>
                <h1>Github User Search</h1>
                <label htmlFor="search">username</label>
                <input id="search" type="text" onChange={handleChange} value={searchTerm} />
                <button onClick={handleSubmit}>Search</button>
                <div>
                    <p>{name}</p>
                    <p>{login}</p>
                    <img src={avatar_url} alt={`$Github user${name}`} />
                    <span>
                        Joined <span>{formatDate()}</span>
                    </span>
                </div>
            </main>
        </div>
    );

    // return (
    //     <div>
    //         <input type="text" value={searchTerm} onChange={handleChange} />
    //         <button onClick={handleSubmit}>Search</button>
    //         {gitHubUser ? (
    //             <div>
    //                 <h1>{gitHubUser.name}</h1>
    //                 <p>{gitHubUser.bio}</p>
    //             </div>
    //         ) : (
    //             <p>Enter a GitHub username to fetch data.</p>
    //         )}
    //     </div>
    // );
}

export default App;
