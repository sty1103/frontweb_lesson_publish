import styles from '@/styles/Home.module.scss';
import type { NextPage } from 'next'
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import PostListContainer from '@/containers/posts/PostsContainer';
import BestPracticeContainer from '@/containers/posts/BestPracticeContainer';
import MainBannerContainer from 'containers/MainBannerContainer';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';
import DashboardContainer from '@/containers/DashboardContainer';

const Home: NextPage = () => {
  const user = useRecoilValue(userAtom);

  return (
    <>
      <Head>
        <title>레슨 노트</title>
        <meta property='og:title' content='레슨 노트' />
        <meta name='description' content='' />
      </Head>
      { (!user || user?.type===0) && 
        <MainBannerContainer />
      }

      { user?.type===1 && 
        <DashboardContainer className={styles.dashboard} />
      }
      <BestPracticeContainer />
      <PostListContainer showLocationToggle={user?.type===1} />
    </>
  )
}

export default Home;
