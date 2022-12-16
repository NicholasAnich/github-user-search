import { formatDate } from "../helpers";
import { UserData } from "../interfaces/interface";
import { ThemeContext } from "../context/ThemeContext";
import styles from "./userinfo.module.scss";
import { useContext } from "react";

export default function UserInfo({ user }: { user: UserData }) {
    const { theme } = useContext(ThemeContext);

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
    } = user;
    return (
        <div className={`${styles[theme]} ${styles.container}`}>
            <h1 className={styles.userName}>{name}</h1>
            <h3 className={styles.userLogin}>@{login}</h3>
            <img
                className="github-avatar"
                src={avatar_url}
                alt={`$Github user ${name}`}
                width={70}
            />
            <span>
                Joined <span>{formatDate(created_at)}</span>
            </span>
            <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Donec odio. Quisque volutpat mattis eros.
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
    );
}
