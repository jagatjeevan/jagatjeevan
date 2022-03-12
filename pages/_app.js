import Head from 'next/head';
import { Provider as ThemeProvider } from '../src/context/themeContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Jagat Jeevan Sahoo</title>
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
