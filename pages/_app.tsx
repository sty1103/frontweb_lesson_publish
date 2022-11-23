import '../styles/globals.scss'
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { useEffect, Suspense } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from '@/components/TopNav';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import User from '@/components/common/User';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noNavPage = ['/signin', '/signup', '/forgot', '/lesson'];

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    window.scrollTo(0,1)
  }, []);
  
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, minimal-ui" />
        </Head>
        
        { !noNavPage.some(v => router.asPath.includes(v)) &&
          <TopNav />
        }

        <main>
          <User />
          <Component {...pageProps} />
        </main>
      </Suspense>
    </RecoilRoot>
  )
}

export default MyApp;
