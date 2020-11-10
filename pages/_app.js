import React from "react";
import Head from "next/head";

import "../styles/tailwind.css";
import "../styles/style.css";
import "antd/dist/antd.css";

import DashboardContextProvider from "../public/shared/Context/Context";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="HandheldFriendly" content="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DashboardContextProvider>
        <Component {...pageProps} />
      </DashboardContextProvider>
    </React.Fragment>
  );
}

export default MyApp;
