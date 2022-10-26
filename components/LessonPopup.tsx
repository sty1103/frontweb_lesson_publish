import styles from '@/styles/LessonPopup.module.scss';
import { Props } from '@/containers/LessonPopupContainer';
import PopUp from './common/PopUp';
import { FaTimes } from 'react-icons/fa';
import Button from './common/Button';
import SongsContainer, { IData } from '@/containers/songs/SongsContainer';
import { IoMdMusicalNote } from 'react-icons/io';

export default function LessonPopup({ className, show=false, onClose=()=>{}}: Props) {
  const songData: IData[] = [ ...Array(12) ];
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
      className={`${styles.lesson} ${className}`} 
      onClose={() => onClose()}
      show={show}
    >
      <div className={styles.title}>
        레슨목록
        <FaTimes onClick={() => onClose()} />
      </div>

      <div className={styles.container}>
        <SongsContainer
          className={styles.songs}
          data={songData}
          onClickSong={clickSong}
        />

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
            <span>피아노</span>
          </div>

          {lessonData.map((v, k) => {
            return (
              <div key={k} className={styles.lesson}>
                <div className={styles.order}>
                  <IoMdMusicalNote />
                  lesson {(k+1).toString().padStart(2, '0')}
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

      <Button onClick={()=>{}}>
        레슨 신청하기
      </Button>
    </PopUp>
  )

  function clickSong() {
    
  }
}