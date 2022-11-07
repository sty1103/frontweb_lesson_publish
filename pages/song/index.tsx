import { NextPage } from 'next';
import SongContainer, { IData } from '@/containers/songs/SongContainer';
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
        {songData.map((v,k) => {
          return (
            <SongContainer key={k} data={v} onClickSong={clickSong} className={styles.item} />
          )
        })}
      </PageContent>
    </PageRoot>
  )

  function clickSong() {
    moveUrl('/song/"songId"');
  }
}

export default SongList;