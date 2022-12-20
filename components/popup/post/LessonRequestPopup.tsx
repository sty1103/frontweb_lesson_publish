import styles from './LessonRequestPopup.module.scss';
import PopUp from '@/components/popup/PopUp';
import { FaTimes } from 'react-icons/fa';
import Button from '@/components/button/Button';
import { IoMdMusicalNote } from 'react-icons/io';
import SongItem, { ISongData } from '@/components/item/song/SongItem';

interface Props {
  className?: string
  show?: boolean;
  onClose?: Function;
}

export default function LessonRequestPopup({ className, show=false, onClose=()=>{}}: Props) {
  const songData: ISongData[] = [ ...Array(12) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  const lessonData = [
    {title: '헤이즈 - 헤픈우연', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
    {title: '캐논 변주곡', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
    {title: 'Falling Slowly', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
    {title: 'Piano Practice Piece', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
  ]

  return (
    <PopUp
      className={`${styles.root} ${className}`} 
      onClose={() => onClose()}
      show={show}
    >
      <div className={styles.header}>
        레슨 신청하기
        <FaTimes onClick={() => onClose()} />
      </div>

      <div className={styles.content}>
        <div className={styles.songs}>
          {songData.map((v,k) => {
            return (
              <SongItem
                className={styles.item}
                data={v}
                onClickSong={clickSong}
                key={k}
              />
            )
          })}
        </div>

        <div className={styles.title}>
          커리큘럼
        </div>

        <div className={styles.curriculum}>
          <div className={styles.desc}>
            피아노 입문자들을 위한 커리큘럼
            <div className={styles.rate}>
              {[...Array(Math.round(1))].map((V, K) => {
                return (
                  <IoMdMusicalNote className={`${styles.active}`} key={K} />
                )
              })}

              {[...Array(4)].map((V, K) => {
                return (
                  <IoMdMusicalNote key={K} />
                )
              })}
            </div>
            <span className={styles.instrument}>피아노</span>
          </div>

          <div className={styles['desc--mobile']}>
            <div>피아노 입문자들을 위한 커리큘럼</div>
            <div>
              <span className={styles.instrument}>피아노</span>
              <div className={styles.rate}>
                {[...Array(Math.round(1))].map((V, K) => {
                  return (
                    <IoMdMusicalNote className={`${styles.active}`} key={K} />
                  )
                })}

                {[...Array(4)].map((V, K) => {
                  return (
                    <IoMdMusicalNote key={K} />
                  )
                })}
              </div>
            </div>
          </div>

          {lessonData.map((v, k) => {
            return (
              <div key={k} className={styles.lesson}>
                <div className={styles.order}>
                  <IoMdMusicalNote />
                  <span className={styles.text}>lesson </span>{(k+1).toString().padStart(2, '0')}
                </div>

                <div className={styles.title}>
                  {v.title}
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
            )
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <Button onClick={()=>{}}>
          레슨 신청하기
        </Button>
      </div>
    </PopUp>
  )

  function clickSong() {
    
  }
}