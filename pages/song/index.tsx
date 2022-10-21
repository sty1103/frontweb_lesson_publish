import { NextPage } from "next";
import SongsContainer, { IData } from "@/containers/songs/SongsContainer";
import styles from '@/styles/songs/SongList.module.scss';

const SongList: NextPage = () => {
  const songData: IData[] = [ ...Array(16) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  return (
    <section className={styles.songlist}>
      <div className={styles.container}>
        <div className={styles.title}>
          곡 목록
        </div>
        <SongsContainer data={songData} />
      </div>
    </section>
    
  )
}

export default SongList;