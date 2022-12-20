import styles from './index.module.scss';
import type { NextPage } from 'next'
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';
import TopBanner from '@/components/contents/TopBanner';
import BestPracticeList from '@/components/list/BestPracticeList';
import PostList from '@/components/list/PostList';
import LessonList from '@/components/list/LessonList';

const Home: NextPage = () => {
  const user = useRecoilValue(userAtom);

  return (
    <div className={styles.root}>
      <Head>
        <title>레슨 노트</title>
        <meta property='og:title' content='레슨 노트' />
        
      </Head>
      { (!user || user?.type===0) && 
        <TopBanner />
      }

      { user?.type===1 && 
        <LessonList className={styles.dashboard} />
      }
      <BestPracticeList />
      <PostList showLocationToggle={user?.type===1} />
    </div>
  )
}

export default Home;
