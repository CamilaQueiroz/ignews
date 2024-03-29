import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "./styles.module.scss";

export function SignInButton() {
  const { data: session } = useSession();

  const isUserLoggedIn = session;

  return isUserLoggedIn ? (
    <button
      className={styles.signInButton}
      type="button"
      onClick={() => signOut()}
    >
      <img src={session.user.image} alt="Avatar" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      type="button"
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign In with GitHub
    </button>
  );
}
