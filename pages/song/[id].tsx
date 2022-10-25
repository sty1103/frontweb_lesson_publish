import { NextPage } from 'next';
import styles from '@/styles/songs/SongDetail.module.scss';
import SongRoot from '@/components/songs/common/SongRoot';
import SongNav from '@/components/songs/common/SongNav';


const SongDetail: NextPage = () => {
  return (
    <SongRoot className={styles.songdetail}>
      <SongNav>
        
      </SongNav>
    </SongRoot>
  )
}

export default SongDetail;