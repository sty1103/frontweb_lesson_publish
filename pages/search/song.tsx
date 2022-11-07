import PageContent from '@/components/common/layout/PageContent';
import PageHeader from '@/components/common/layout/PageHeader';
import PageRoot from '@/components/common/layout/PageRoot';
import SongsContainer, { IData } from '@/containers/songs/SongContainer';
import { moveUrl } from '@/lib/utils';
import styles from '@/styles/search/SearchSong.module.scss';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  word: string;
}

const SearchSong: NextPage = () => {
  const songData: IData[] = [ ...Array(20) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })
  
  return (
    <PageRoot className={styles.root}>
      <PageHeader className={styles.nav} prevButton={true}>
        <span>곡</span>
        <span>127</span>
      </PageHeader>
      <PageContent className={styles.content}>
        <SongsContainer data={songData} onClickSong={() => moveUrl('/song/"songId"')} />
      </PageContent>
    </PageRoot>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = {
    word: context.query.word
  }

  return {
    props
  }
}

export default SearchSong;