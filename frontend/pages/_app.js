import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
