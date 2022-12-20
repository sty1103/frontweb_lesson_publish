import SongItem, { ISongData } from '@/components/item/song/SongItem';
import PageContent from '@/components/layout/page/PageContent';
import PageRoot from '@/components/layout/page/PageRoot';
import { moveUrl } from '@/utils/common';
import { NextPage } from 'next';
import styles from './index.module.scss';

const SongList: NextPage = () => {
  const songData: ISongData[] = [ ...Array(50) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  return (
    <PageRoot className={styles.root}>
      <PageContent className={styles.content}>
        {songData.map((v,k) => {
          return (
            <SongItem key={k} data={v} onClickSong={clickSong} className={styles.item} />
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