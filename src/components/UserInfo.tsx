import { useContext } from "react";
import { formatDate } from "../helpers";
import { UserData } from "../interfaces/interface";
import { ThemeContext } from "../context/ThemeContext";
import SocialLinks from "./SocialLinks";
import styles from "./userinfo.module.scss";

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
        blog,
    } = user;

    const socialLinksProps = {
        theme: theme,
        location: location,
        blog: blog,
        twitter_username: twitter_username,
        company: company,
    };

    return (
        <div className={`${styles[theme]} ${styles.container}`}>
            <div className={styles.heroContainer}>
                <img
                    className={`github-avatar ${styles.heroImage}`}
                    src={avatar_url}
                    alt={`$Github user ${name}`}
                    width={70}
                />
                <div className={styles.heroInfo}>
                    <h1 className={styles.heroName}>{name}</h1>
                    <h3 className={styles.heroLogin}>@{login}</h3>
                    <span className={styles.heroJoined}>
                        Joined <span>{formatDate(created_at)}</span>
                    </span>
                </div>
            </div>

            <div className={styles.userMetaContainer}>
                <p className={styles.text}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing
                    elit. Donec odio. Quisque volutpat mattis eros.
                </p>
                <div className={styles.user}>
                    <div className={styles.userData}>
                        <span className={styles.userTitle}>Repos</span>
                        <span className={styles.digit}>
                            {public_repos}
                        </span>
                    </div>
                    <div className={styles.userData}>
                        <span className={styles.userTitle}>Followers</span>
                        <span className={styles.digit}>{followers}</span>
                    </div>
                    <div className={styles.userData}>
                        <span className={styles.userTitle}>Following</span>
                        <span className={styles.digit}>{following}</span>
                    </div>
                </div>
                <SocialLinks {...socialLinksProps} />
            </div>
        </div>
    );
}
