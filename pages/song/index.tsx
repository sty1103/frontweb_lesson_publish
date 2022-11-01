import { NextPage } from 'next';
import SongsContainer, { IData } from '@/containers/songs/SongsContainer';
import styles from '@/styles/songs/SongList.module.scss';
import PageRoot from '@/components/common/layout/PageRoot';
import PageContent from '@/components/common/layout/PageContent';
import { moveUrl } from '@/lib/utils';

const SongList: NextPage = () => {
  const songData: IData[] = [ ...Array(16) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  return (
    <PageRoot className={styles.root}>
      <PageContent className={styles.content}>
        <SongsContainer data={songData} onClickSong={clickSong} />
      </PageContent>
    </PageRoot>
  )

  function clickSong() {
    moveUrl('/song/"songId"');
  }
}

export default SongList;