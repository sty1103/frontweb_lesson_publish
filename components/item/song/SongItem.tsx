import styles from './SongItem.module.scss';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoMdMusicalNote } from "react-icons/io";
import Image from "next/legacy/image";

export interface ISongData {
  title: string;
  artist: string;
  rate: number;
}

export interface Props {
  className?: string;
  onClickSong?: Function;
  data: ISongData;
}

export default function SongItem({ data, className, onClickSong=()=>{} }: Props) {
  return (
    <div className={`${styles.root} ${className}`} onClick={() => onClickSong()} key={`songitem_${ new Date().getTime() }`}>
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