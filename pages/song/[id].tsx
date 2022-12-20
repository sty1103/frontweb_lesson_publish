import { NextPage } from 'next';
import styles from './[id].module.scss';
import Image from "next/legacy/image";
import { IoMdMusicalNote } from 'react-icons/io';
import { BsList } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';
import PageRoot from '@/components/layout/page/PageRoot';
import PageHeader from '@/components/layout/page/PageHeader';
import PageContent from '@/components/layout/page/PageContent';
import Button from '@/components/button/Button';
import { moveUrl } from '@/utils/common';
import Score from '@/components/score/Score';

const SongDetail: NextPage = () => {
  const user = useRecoilValue(userAtom);
  return (
    <PageRoot className={styles.root}>
      <PageHeader prevButton={true}>
        곡 상세
      </PageHeader>

      <PageContent className={styles.content}>
        <div className={styles.wrapper}>
          <div className={styles.album}>
            <div className={styles.left}>
              <Image
                  src='/images/albumart.jpeg'
                  alt=''
                  layout='fill'
                  objectFit='cover'
                />
            </div>
            <div className={styles.right}>
              <div className={styles.top}>
                <div className={styles.left}>
                  <div className={styles.title}>
                    너를 만나
                  </div>
                  <div className={styles.name}>
                    폴킴
                  </div>
                  <div className={styles.rate}>
                    {[...Array(Math.round(4))].map((V, K) => {
                      return (
                        <IoMdMusicalNote className={`${styles.active}`} key={K} />
                      )
                    })}

                    {[...Array(1)].map((V, K) => {
                      return (
                        <IoMdMusicalNote key={K} />
                      )
                    })}
                  </div>
                </div>
                <div className={styles.right}>
                  <div>
                    <div>앨범</div>
                    <div>너를 만나</div>
                  </div>
                  <div>
                    <div>발매일</div>
                    <div>2018.10.29</div>
                  </div>
                  <div>
                    <div>장르</div>
                    <div>발라드</div>
                  </div>
                  <div>
                    <div>마디수</div>
                    <div>72</div>
                  </div>
                </div>
              </div>

              { user?.type!==1 &&
                <div className={styles.bottom}>
                  <Button onClick={()=>{}}>
                    <BsList /> 연습 기록 목록
                  </Button>
                  <Button onClick={()=>{}}>
                  <IoMdMusicalNote /> 연습하기
                  </Button>
                  <Button onClick={() => moveUrl('/lesson/request/"songid"')}>
                    <IoMdMusicalNote /> 레슨 신청하기
                  </Button>
                </div>
              }
            </div>
          </div>  
        </div>

        <div className={styles[`mobile-albuminfo`]}>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              앨범소개
            </div>
            <div className={styles.right}>
              <div>
                <div>앨범</div>
                <div>너를 만나</div>
              </div>
              <div>
                <div>발매일</div>
                <div>2018.10.29</div>
              </div>
              <div>
                <div>장르</div>
                <div>발라드</div>
              </div>
              <div>
                <div>마디수</div>
                <div>72</div>
              </div>
            </div>
          </div>
          
          { user?.type!==1 &&
            <div className={styles.buttons}>
              <Button onClick={()=>{}}>
                <BsList /> 연습 기록 목록
              </Button>
              <Button onClick={()=>{}}>
              <IoMdMusicalNote /> 연습하기
              </Button>
              <Button onClick={() => moveUrl('/song/request/"songid"')}>
                <IoMdMusicalNote /> 레슨 신청하기
              </Button>
            </div>
          }
        </div>

        <div className={styles.score}>
          <Score file='/musicxml/For_Exhibition_I will.xml' />
          </div>
      </PageContent>
    </PageRoot>
  )
}

export default SongDetail;