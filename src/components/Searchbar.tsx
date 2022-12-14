import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "/assets/icon-search.svg";

export default function Searchbar({ setUser }) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [userName, setUserName] = useState<string>("octocat");

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
        <div>
            <label htmlFor="search">
                <img src={searchIcon} alt="search icon" />
            </label>
            <input
                id="search"
                type="text"
                placeholder="Search GitHub username..."
                onChange={handleChange}
                value={searchTerm}
            />
            <button onClick={handleSubmit}>Search</button>
        </div>
    );
}
