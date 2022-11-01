import '../styles/globals.scss'
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { useEffect, Suspense } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from '@/components/TopNav';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noNavPage = ['/signin', '/signup', '/forgot', '/lesson'];

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1.0' user-scalable='no' />
        </Head>
        
        { !noNavPage.some(v => router.asPath.includes(v)) &&
          <TopNav />
        }

        <main>
          <Component {...pageProps} />
        </main>
      </Suspense>
    </RecoilRoot>
  )
}

export default MyApp;
