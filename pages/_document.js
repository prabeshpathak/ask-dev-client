import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import SiteConfig from "../site.config";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const intitialProps = await Document.getInitialProps(ctx);
    return { ...intitialProps };
  }

  render() {
    return (
      <Html lang={SiteConfig.lang}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content={SiteConfig.description} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
