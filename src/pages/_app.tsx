import { AppProps } from "next/app";
import Header from "../components/Header/Index";
import { SessionProvider } from "next-auth/react";

import "../styles/global.scss";
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("../components/Header/Index"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <DynamicHeader />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
