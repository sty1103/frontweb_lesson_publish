import '../styles/globals.scss'
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from '@/components/TopNav';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  let topNav = <TopNav />;
  const router = useRouter();
  const noNavUrl = [ '/signin', '/signup', '/forgot' ];

  if ( noNavUrl.some(v => router.asPath.includes(v)) ) {
    topNav = <></>;
  }

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' user-scalable='no' />
      </Head>
      {topNav}
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp;
