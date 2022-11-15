import SongContainer, { IData } from '@/containers/songs/SongContainer';
import styles from '@/styles/profile/ProfileRequest.module.scss';
import Image from "next/legacy/image";
import { MdArrowForwardIos } from 'react-icons/md';

interface Props {
  className?: string;
  data: IData[];
}

export default function MyPageRequest({ className, data }: Props) {
  return (
    <div className={styles.requests}>
      {data.map((v,k) => {
        const song = [ v ];
        return (
          <></>
          // <div className={styles.wrapper} key={k}>
          //   <SongContainer className={styles.song} data={song} />
          //   <div className={styles.teacher}>
          //     <div className={styles.img}>
          //       {/* <Image /> */}
          //     </div>
          //     <div className={styles.name}>
          //       김은수
          //     </div>
          //     <div className={styles.status}>
          //       신청중
          //     </div>

          //     <MdArrowForwardIos />
          //   </div>
          // </div>
        )
      })}
    </div>
  )
}