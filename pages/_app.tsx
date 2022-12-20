import '@/styles/globals.scss';
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { useEffect, Suspense } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import TopNavBar from '@/components/contents/TopNavBar';
import RouteGuard from '@/components/auth/RouteGuard';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // Nav Bar가 없는 페이지 경로 패턴
  const noNavPage = [ /\/signin/g, /\/signup/g, /\/password/g, /\/lesson\/(?!request)/g ];

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    window.scrollTo(0,1);
  }, []);
  
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, minimal-ui" />
        </Head>

        <main>
          { !noNavPage.some(v => v.test(router.asPath)) &&
            <TopNavBar />
          }

          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </main>
      </Suspense>
    </RecoilRoot>
  )
}

export default MyApp;
