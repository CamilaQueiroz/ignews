import { signIn, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJS } from "../../services/stripe-js";
import styles from "./styles.module.scss";

export function SubscribeButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSubscribe = async () => {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripeJs = await getStripeJS();

      await stripeJs.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.subscribeButton}
        onClick={() => handleSubscribe()}
      >
        Subscribe now
      </button>
    </>
  );
}
