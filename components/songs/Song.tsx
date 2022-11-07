import styles from '@/styles/songs/Song.module.scss';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoMdMusicalNote } from "react-icons/io";
import Image from "next/image";
import { IData } from '@/containers/songs/SongContainer'

interface Props {
  data: IData;
  className?: string;
  onClickSong?: Function;
  key?: string | number;
}

export default function Song({ data, className, onClickSong=()=>{}, key }: Props) {
  return (
    <div className={`${styles.root} ${className}`} onClick={() => onClickSong()} key={key}>
      <Image
        src='/images/albumart.jpeg'
        alt=''
        layout='fill'
        objectFit='cover'
      />
      <AiOutlineHeart className={styles.heart} />
      <div className={styles.content}>
        <div className={styles.title}>
          {data.title}
        </div>
        <div className={styles.artist}>
          {data.artist}
        </div>
        <div className={styles.rate}>
          {[...Array(Math.round(data.rate))].map((V, K) => {
            return (
              <IoMdMusicalNote className={`${styles.active}`} key={K} />
            )
          })}

          {[...Array(5 - data.rate)].map((V, K) => {
            return (
              <IoMdMusicalNote key={K} />
            )
          })}
        </div>
      </div>
    </div>
  );
}