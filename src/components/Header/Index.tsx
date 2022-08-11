import { ActiveLink } from "../ActiveLink";
import { SignInButton } from "../SignInButton/Index";
import styles from "./styles.module.scss";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="Logo " />
        <nav>
          <ActiveLink activeClassLink={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassLink={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
