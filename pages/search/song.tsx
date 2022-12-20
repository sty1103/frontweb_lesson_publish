import styles from './song.module.scss';
import { GetServerSideProps, NextPage } from 'next';
import SongItem, { ISongData } from '@/components/item/song/SongItem';
import PageRoot from '@/components/layout/page/PageRoot';
import PageHeader from '@/components/layout/page/PageHeader';
import PageContent from '@/components/layout/page/PageContent';
import { moveUrl } from '@/utils/common';

interface Props {
  word: string;
}

const SearchSong: NextPage = () => {
  const songData: ISongData[] = [ ...Array(20) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })
  
  return (
    <PageRoot className={styles.root}>
      <PageHeader className={styles.header} prevButton={true}>
        <span>곡</span>
        <span>127</span>
      </PageHeader>
      <PageContent className={styles.content}>
        {songData.map((v,k) => {
          return (
            <SongItem
            className={styles.item}
              data={v}
              onClickSong={() => moveUrl('/song/"songId"')}
              key={k}
            />
          )
        })}
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