import React, { useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import Head from "next/head";

import useComponentVisivle from "../hooks/useComponentVisible";
import ModalContext from "../store/modal";
import { AuthProvider } from "../store/auth";
import { FetchProvider } from "../store/fetch";
import { TagProvider } from "../store/tags";

import Modal from "../components/modal";
import AuthForms from "../components/auth-forms";

import "../styles/globals.scss";
import "../styles/variables.css";
import "react-tagsinput/react-tagsinput.css";
import "../styles/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const { ref, isVis, setIsVis } = useComponentVisivle(false);

  const [authScreen, setAuthScreen] = useState(null);

  const handleComVis = (comVis, authScreen) => {
    setIsVis(comVis);
    setAuthScreen(authScreen);
  };

  return (
    <ModalContext.Provider value={{ ref, handleComVis, setIsVis }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <FetchProvider>
          <TagProvider>
            <Component {...pageProps} />
            {isVis && (
              <Modal>
                <AuthForms screen={authScreen} />
              </Modal>
            )}
          </TagProvider>
        </FetchProvider>
      </AuthProvider>
    </ModalContext.Provider>
  );
}

export default MyApp;
