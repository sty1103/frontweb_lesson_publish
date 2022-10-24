import ReviewPopUpContainer from '@/containers/posts/ReviewPopupContainer';
import ScoreDisplayContainer from '@/containers/score/ScoreDisplayContainer';
import { moveUrl } from '@/lib/utils';
import styles from '@/styles/posts/PostCurriculumDetail.module.scss';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { BsShare } from 'react-icons/bs';
import { FaSearchPlus } from 'react-icons/fa';
import { ImLocation2 } from 'react-icons/im';
import { IoMdMusicalNote } from 'react-icons/io';
import Button from '../common/Button';
import PostDetailContainer from './common/PostDetailContainer';
import PostDetailNav from './common/PostDetailNav';
import PostDetailRoot from './common/PostDetailRoot';
import { useState } from 'react';

interface Data {
  title: string;
  rate: number;
  xml: string;
}

interface Props  {
  data: Data[];
}
export default function PostCurriculumDetail({ data }: Props) {
  const [ reviewPopup, setReviewPopup ] = useState<boolean>(false);

  return (
    <PostDetailRoot className={styles.postdetail}>
      <PostDetailNav>
        피아노 입문자들을 위한 커리큘럼
      </PostDetailNav>

      <PostDetailContainer className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
            <div className={styles.author}>
              <span className={styles.img}>
                {/* <img /> */}
              </span>
              <span className={styles.name}>
                김도우 선생님
                </span>
              <span className={styles.rate}>
                <AiFillStar /> 3.8
              </span>
              <span className={styles.location}>
                <ImLocation2 />
                1.2km 대치동
              </span>

              <BsShare className={styles.share} />
              <div className={styles.like}>
                <AiOutlineHeart />
                <span>200</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.title}>
            <IoMdMusicalNote />
            <span>LESSON 01</span>
            <span>헤이즈 - 헤픈우연</span>
          </div>
          
          <ScoreDisplayContainer file={data[0].xml} />

          <div className={styles.lessons}>
            <span className={styles.desc}>
              초보자분들에게 추천하는 커리큘럼이고 총 9곡으로 이루어져 있습니다~!!
            </span>

            {data.map((v, k) => {
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

        <div className={styles.bottom}>
          <Button shape='rect' onClick={clickReview}>
            <BiComment />
            리뷰보기
          </Button>
          <Button shape='rect' onClick={()=>{}}>
            <IoMdMusicalNote />
            레슨 신청하기
          </Button>
        </div>

        <ReviewPopUpContainer show={reviewPopup} onClose={closeReview} />
      </PostDetailContainer>
    </PostDetailRoot>
  )

  function clickReview() {
    setReviewPopup(true);
  }

  function closeReview() {
    console.log(1);
    setReviewPopup(false);
  }
}