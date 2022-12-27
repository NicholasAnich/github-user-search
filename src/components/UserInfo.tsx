import { useContext } from "react";
import { formatDate } from "../helpers";
import { UserData } from "../interfaces/interface";
import { ThemeContext } from "../context/ThemeContext";
import SocialLinks from "./SocialLinks";
import styles from "./userinfo.module.scss";

type Errors = {
    message?: string;
};

interface Props {
    user: UserData;
    errors: Errors | null;
    isLoading: boolean;
}

export default function UserInfo({ user, errors, isLoading }: Props) {
    const { theme } = useContext(ThemeContext);
    const {
        name,
        login,
        public_repos,
        followers,
        following,
        created_at,
        location,
        bio,
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

    if (errors) {
        return (
            <div className={`${styles[theme]} ${styles.errContainer}`}>
                <img
                    className={styles.errorImage}
                    src="./assets/octobiwan.svg"
                    alt="octocat jedi"
                    height={100}
                />
                <span className={styles.errorMessage}>
                    {errors.message}
                </span>
            </div>
        );
    } else {
        if (isLoading) {
            return (
                <div className={`${styles[theme]} ${styles.errContainer}`}>
                    <span className={styles.isLoading}>Loading...</span>
                </div>
            );
        }
        return (
            <div className={`${styles[theme]} ${styles.container}`}>
                <div className={styles.imageContainer}>
                    <img
                        className={`github-avatar ${styles.heroImage}`}
                        src={avatar_url}
                        alt={`$Github user ${name ? name : "empty..."}`}
                        width={70}
                    />
                </div>
                <div className={styles.heroContainer}>
                    <div className={styles.heroInfo}>
                        <h1 className={styles.heroName}>
                            {name ? name : "my name..."}
                        </h1>
                        <h3 className={styles.heroLogin}>@{login}</h3>
                        <span className={styles.heroJoined}>
                            Joined{" "}
                            <span>{formatDate(created_at ?? "")}</span>
                        </span>
                    </div>
                </div>
                <p className={styles.text}>
                    {bio ? bio : "This profile has no bio"}
                </p>

                <div className={styles.userMetaContainer}>
                    <div className={styles.user}>
                        <div className={styles.userData}>
                            <span className={styles.userTitle}>Repos</span>
                            <span className={styles.digit}>
                                {public_repos}
                            </span>
                        </div>
                        <div className={styles.userData}>
                            <span className={styles.userTitle}>
                                Followers
                            </span>
                            <span className={styles.digit}>
                                {followers}
                            </span>
                        </div>
                        <div className={styles.userData}>
                            <span className={styles.userTitle}>
                                Following
                            </span>
                            <span className={styles.digit}>
                                {following}
                            </span>
                        </div>
                    </div>
                    <SocialLinks {...socialLinksProps} />
                </div>
            </div>
        );
    }
}
