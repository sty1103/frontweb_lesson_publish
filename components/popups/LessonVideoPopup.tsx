import styles from '@/styles/popups/LessonVideoPopup.module.scss';
import PopUp from "@/components/common/PopUp";
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface Props {
  className?: string;
  show?: boolean
  onClose?: Function;
}

export default function LessonVideoPopup({ className, show=false, onClose=()=>{} }: Props) {
  return (
    <PopUp
      className={`${styles.root} ${className}`}
      show={show}
      onClose={() => onClose()}
    >
      <div className={styles.nav}>
        첨부 영상
        <FaTimes onClick={() => onClose()} />
      </div>

      <div className={styles.content}>
        <div className={styles.item}>
          <div className={styles.top}>
            <span className={styles.img}>
              {/* <Image /> */}
            </span>
            <span className={styles.name}>
              김은수
            </span>
            <span className={styles.date}>
              2022.07.02
            </span>
          </div>
          <div className={styles.middle}>
            영상 참고 바랍니다
            <video controls>
              <source src='/videos/piano_play.mov' type="video/mp4" />
              브라우저가 비디오 재생을 지원히지 않습니다.
            </video>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.top}>
            <span className={styles.img}>
              {/* <Image /> */}
            </span>
            <span className={styles.name}>
              김은수
            </span>
            <span className={styles.date}>
              2022.07.02
            </span>
          </div>
          <div className={styles.middle}>
            영상 참고 바랍니다
            <video controls>
              <source src='/videos/piano_play.mov' type="video/mp4" />
              브라우저가 비디오 재생을 지원히지 않습니다.
            </video>
          </div>
        </div>
      </div>
    </PopUp>
  )
}