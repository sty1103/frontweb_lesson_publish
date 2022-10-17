import ScoreDisplayContainer from '@/containers/score/ScoreDisplayContainer';
import styles from '@/styles/posts/PostCurriculum.module.scss';
import { BiComment } from 'react-icons/bi';
import { IoMdMusicalNote } from 'react-icons/io';
import { FaSearchPlus } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import Button from '../common/Button';
import Image from 'next/image';

interface Data {
  title: string;
  rate: number;
  xml: string;
}

interface Props  {
  data: Data[];
}

export default function PostCurriculum({ data }: Props) {
  return (
    <div className={styles.curriculum}>
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.title}>
            <span className={styles.type}>커리큘럼</span>
            피아노 입문자들을 위한 커리큘럼
          </div>
          <div className={styles.author}>
            <span>
              {/* <img /> */}
            </span>

            <span>김도우 선생님</span>

            <span>
              <AiFillStar />
              3.8
            </span>

            <span>
              <ImLocation2 />
              1.2km 대치동
            </span>

            <span>
              <span>피아노</span>
              <span>기타</span>
              <span>드럼</span>
              <span>바이올린</span>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.middle}>
        <div className={styles.title}>
          <IoMdMusicalNote />
          <span>LESSON 01</span>
          <span>헤이즈 - 헤픈우연</span>
        </div>
        
        <div className={styles.score}>
          <ScoreDisplayContainer file={data[0].xml} />
          <div className={styles.overlay} />
          <Button onClick={() => {}}>
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
        <Button shape='rect' onClick={()=>{}}>
          <BiComment />
          리뷰보기
        </Button>
        <Button shape='rect' onClick={()=>{}}>
          <IoMdMusicalNote />
          레슨 신청하기
        </Button>
      </div>      
    </div>
  )
}