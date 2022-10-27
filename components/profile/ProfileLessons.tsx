import SongsContainer, { IData } from '@/containers/songs/SongsContainer';
import styles from '@/styles/profile/ProfileLessons.module.scss';
import Image from 'next/image';

interface Props {
  className?: string;
  data: IData[];
}

export default function MyPageLessons({ className, data }: Props) {
  return (
    <div className={styles.lessons}>
      {data.map((v,k) => {
        const song = [ v ];
        return (
          <div className={styles.wrapper} key={k}>
            <SongsContainer className={styles.song} data={song} />
            <div className={styles.teacher}>
              <div className={styles.img}>
                {/* <Image /> */}
              </div>
              <div className={styles.name}>
                김은수
              </div>
              <div className={styles.status}>
                레슨완료
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}