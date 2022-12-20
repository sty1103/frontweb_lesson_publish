import Score from '@/components/score/Score';
import styles from './CurriculumItem.module.scss';
import { BiComment } from 'react-icons/bi';
import { IoMdMusicalNote } from 'react-icons/io';
import { FaSearchPlus } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import Button from '@/components/button/Button';
import Image from "next/legacy/image";
import { useState } from 'react';
import { moveUrl } from '@/utils/common';
import ReviewPopUp from '@/components/popup/post/ReviewPopup';
import LessonRequestPopup from '@/components/popup/post/LessonRequestPopup';

interface Data {
  title: string;
  rate: number;
  xml: string;
}

export default function CurriculumItem() {
  const [ reviewPopup, setReviewPopup ] = useState<boolean>(false);
  const [ lessonPopup, setLessonPopup ] = useState<boolean>(false);

  const data = [
    {title: '헤이즈 - 헤픈우연', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
    {title: '캐논 변주곡', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
    {title: 'Falling Slowly', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
    {title: 'Piano Practice Piece', rate: 4, xml: '/musicxml/For_Exhibition_I will.xml'},
  ];

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.title} onClick={() => moveUrl(`/post/curriculum/"postId"`)}>
            <span className={styles.type}>커리큘럼</span>
            피아노 입문자들을 위한 커리큘럼
          </div>
          <div className={styles.author}>
            <span onClick={() => moveUrl('/profile/{userId}')}>
              <span className={styles.img}>
                {/* <img /> */}
              </span>
              <span className={styles.name}>
                김도우 선생님
              </span>
            </span>
            <span className={styles.rate}>
              <AiFillStar /> 3.8
            </span>
            <span className={styles.location}>
              <ImLocation2 />
              1.2km 대치동
            </span>
            <span className={styles.instrument}>
              <span>피아노</span>
              <span>기타</span>
              <span>드럼</span>
              <span>바이올린</span>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.middle}>
        <div className={styles.title} onClick={() => moveUrl('/song/1a2b3c')}>
          <IoMdMusicalNote />
          <span>LESSON 01
          </span>
          <span>헤이즈 - 헤픈우연</span>
        </div>
        
        <div className={styles.score}>
          <Score file={data[0].xml} />
          <div className={styles.overlay} />
          <Button onClick={() => moveUrl(`/post/123?type=curriculum`)}>
            <FaSearchPlus />
            자세히 보기
          </Button>
        </div>

        <div className={styles.lessons}>
          <span className={styles.desc}>
            초보자분들에게 추천하는 커리큘럼이고 총 9곡으로 이루어져 있습니다~!!
          </span>

          {data.map((v, k) => {
            return (
              <div key={k} className={styles.lesson}>
                <div className={styles.order}>
                  <IoMdMusicalNote />
                  <span className={styles.text}>lesson </span>
                  {(k+1).toString().padStart(2, '0')}
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

      <div className={styles.bottom}>
        <Button shape='rect' onClick={clickReview}>
          <BiComment />
          리뷰보기
        </Button>
        <Button shape='rect' onClick={clickLesson}>
          <IoMdMusicalNote />
          레슨 신청하기
        </Button>
      </div>

      <ReviewPopUp show={reviewPopup} onClose={closeReview} />
      <LessonRequestPopup show={lessonPopup} onClose={closeLesson} />
    </div>
  )

  function clickReview() {
    setReviewPopup(true);
  }

  function closeReview() {
    setReviewPopup(false);
  }

  function clickLesson() {
    setLessonPopup(true);
  }

  function closeLesson() {
    setLessonPopup(false);
  }
}