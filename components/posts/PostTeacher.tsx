import styles from '@/styles/posts/PostTeacher.module.scss';
import Button from '../common/Button';
import { ImLocation2 } from 'react-icons/im';
import { BiComment } from 'react-icons/bi';
import { IoMdMusicalNote } from 'react-icons/io';
import { useState } from 'react';
import ReviewPopUp from './common/ReviewPopup';

export default function PostTeacher() {
  const [ reviewPopup, setReviewPopup ] = useState<boolean>(false);

  return (
    <div className={styles.teacher}>
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.title}>
            <div className={styles.type}>
              선생님
            </div>
          </div>
        </div>
      </div>

      <div className={styles.middle}>
        <div className={styles.profile}>
          <div className={styles.left}>
            <div className={styles.img}>
              {/* <img src='' /> */}
            </div>
            <span className={styles.name}>
              김도우
            </span>
            <div className={styles.sub}>
              <ImLocation2 />
              1.2km 대치동
              <span>비대면</span>
              <span>동네</span>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.title}>
              여러분을 베토벤으로 만들어줄 선생님
            </div>
            <div className={styles.instruments}>
              <span>피아노</span>
              <span>기타</span>
              <span>드럼</span>
              <span>바이올린</span>
            </div>
            <div className={styles.desc}>
              안녕하세요! 음악인들을 위한 음악인, 김도우입니다.
              <br/>
              현재 음악과의 8년차로 수준에 맞는 수업 가능합니다!
            </div>
          </div>
        </div>

        <div className={styles.achievements}>
          <div className={styles.rate}>
            <span>4.5</span>
            <span>별점(레슨 파워)</span>
          </div>
          <div className={styles.like}>
            <span>3.8K</span>
            <span>좋아요</span>
          </div> 
          <div className={styles.curriculum}>
            <span>32</span>
            <span>업로드 커리큘럼</span>
          </div>
          <div className={styles.complete}>
            <span>546</span>
            <span>레슨 완료</span>
          </div>
          <div className={styles.student}>
            <span>324</span>
            <span>레슨 학생</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <Button shape='rect' onClick={clickReview}>
          <BiComment />
          리뷰보기
        </Button>
        <Button shape='rect' onClick={() => {}}>
          <IoMdMusicalNote />
          레슨 신청하기
        </Button>
      </div>

      <ReviewPopUp show={reviewPopup} onClose={closeReview} />
    </div>
  )

  function clickReview() {
    setReviewPopup(true);
  }

  function closeReview() {
    setReviewPopup(false);
  }
}