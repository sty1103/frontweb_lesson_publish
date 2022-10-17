import type { NextPage } from 'next'
import Head from 'next/head';
import styles from '../styles/Home.module.scss'
import 'bootstrap/dist/css/bootstrap.css';
import PostListContainer from 'containers/posts/PostListContainer';
import BestPracticeContainer from '@/containers/posts/BestPracticeContainer';
import MainBannerContainer from 'containers/MainBannerContainer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>레슨 노트</title>
        <meta property='og:title' content='레슨 노트' />
        <meta name='description' content='' />
      </Head>
      <MainBannerContainer />
      <BestPracticeContainer />
      <PostListContainer />
    </>
  )
}

export default Home;
