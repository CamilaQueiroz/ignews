import { signIn, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJS } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();
  const { push } = useRouter();
  const handleSubscribe = async () => {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      push("/posts");
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
