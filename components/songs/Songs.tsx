import styles from '@/styles/songs/Songs.module.scss';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoMdMusicalNote } from "react-icons/io";
import Image from "next/image";
import { IData } from '@/containers/songs/SongsContainer'

interface Props {
  data: IData[];
  className?: string;
  onClickSong?: Function;
}

export default function Songs({ data, className, onClickSong=()=>{} }: Props) {
  return (
    <div className={`${styles.items} ${className}`}>
      {data.map((v, k) => {
        return (
          <div className={styles.item} onClick={() => onClickSong()} key={k}>
            <Image
              src='/images/albumart.jpeg'
              alt=''
              layout='fill'
              objectFit='cover'
            />
            <AiOutlineHeart className={styles.heart} />
            <div className={styles.content}>
              <div className={styles.title}>
                {v.title}
              </div>
              <div className={styles.artist}>
                {v.artist}
              </div>
              <div className={styles.rate}>
                {[...Array(Math.round(v.rate))].map((V, K) => {
                  return (
                    <IoMdMusicalNote className={`${styles.active}`} key={K} />
                  )
                })}

                {[...Array(5 - v.rate)].map((V, K) => {
                  return (
                    <IoMdMusicalNote key={K} />
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}