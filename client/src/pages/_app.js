import '../styles/global.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://kit.fontawesome.com/760cd49c8e.js" crossorigin="anonymous"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}