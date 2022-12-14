import styles from './[id].module.scss';
import { AiOutlineAlert, AiOutlineHeart } from 'react-icons/ai';
import Image from "next/legacy/image";
import { IoIosMore, IoMdMusicalNote } from 'react-icons/io';
import { BsShare } from 'react-icons/bs';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';
import PageRoot from '@/components/layout/page/PageRoot';
import PageHeader from '@/components/layout/page/PageHeader';
import PageContent from '@/components/layout/page/PageContent';
import { moveUrl } from '@/utils/common';
import Button from '@/components/button/Button';
import Score from '@/components/score/Score';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  id: string;
}

const PracticeDetail: NextPage<Props> = ({ id }) => {
  const user = useRecoilValue(userAtom);
  const commentsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener('click', () => {
      initDropbox();
    })

    // 댓글로 자동 이동
    if ( router.query.comment ) {
      setTimeout(()=>{
        commentsRef.current?.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
      }, 200);
    }
  });

  return (
    <PageRoot className={styles.root}>
      <PageHeader className={styles.header} prevButton={true}>
        게시글

        <BsShare className={styles.share} />

        <div className={styles.like}>
          <AiOutlineHeart />
          <span>200</span>
        </div>
      </PageHeader>

      <PageContent className={styles.content}>
        <div className={styles.title}>
          유명한 곡 연주해봤어요. 한번 들어주세요
        </div>
        <div className={styles.top}>  
          <div className={styles.author}>
            <div className={styles.left} onClick={() => moveUrl('/profile/f0kjflakdjf')}>
              {/* <Image /> */}
            </div>
            <div className={styles.right}>
              <div className={styles.name} onClick={() => moveUrl('/profile/f0kjflakdjf')}>
                방구석뮤지션
              </div>
              <div className={styles.sub}>
                1시간 전
                <span className={styles.seperator} />
                피아노
                <span className={styles.seperator} />
                <span className={styles.report}>
                  <AiOutlineAlert />
                  신고하기
                </span>
              </div>
            </div>
          </div>

          { user?.type===0 &&
            <Button className={styles.question} onClick={() => {}}>
              <IoMdMusicalNote />
              선생님에게 질문하기
            </Button>
          }

          { user?.type===1 &&
            <Button onClick={() => {}}>
              <IoMdMusicalNote />
              동네 레슨 수락
            </Button>
          }

          <BsShare className={styles.share} />

          <div className={styles.like}>
            <AiOutlineHeart />
            <span>200</span>
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.title} onClick={() => moveUrl('/song/1a2b3c')}>
            <IoMdMusicalNote />
            베토벤 교향곡 제2번 D장조 Op.36
          </div>
          
          <div className={styles.score}>
            <Score file='/musicxml/For_Exhibition_I will.xml' />
          </div>

          <video controls>
            <source src='/videos/piano_play.mov' type="video/mp4" />
            브라우저가 비디오 재생을 지원히지 않습니다.
          </video>

          <div className={styles.desc}>
            후반 부분에서 연주하기가 어렵네요. 조언 부탁드립니다!
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.write}>
            <input type='text' placeholder='댓글을 남겨보세요' />
            <Button onClick={()=>{}}>
              댓글달기
            </Button>
          </div>

          <div className={styles.comments} ref={commentsRef}>
            {[...Array(5)].map((v,k) => {
              return (
                <div className={styles.comment} key={k}>
                  <div className={styles.img}>
                    {/* <Image /> */}
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.name}>
                      니가내가
                      <span className={styles.type}>선생님</span>
                      <span className={styles.time}>09:55</span>
                    </div>
                    <div className={styles.content}>
                      생각보다 잘하시는데요!
                    </div>
                    <div className={styles.reply}>
                      답글쓰기
                    </div>
                  </div>

                  <Button onClick={clickOption}>
                    <IoIosMore />
                    <div className={styles.dropbox}>
                      <div className={styles.item}>
                        신고하기
                      </div>
                    </div>
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </PageContent>
    </PageRoot>
  )

  function clickPrev() {
    router.back();
  }

  function initDropbox() {
    const dropboxes = commentsRef.current?.querySelectorAll(`.${styles.dropbox}.${styles.active}`);

    dropboxes?.forEach((elem) => {
      elem.classList.remove(styles.active);
    });
  }

  function clickOption(e: React.MouseEvent) {
    e.stopPropagation();
    const cursor = e.currentTarget.querySelector(`.${styles.dropbox}`);
    
    if ( cursor?.classList.contains(styles.active) ) {
      initDropbox();
    } else {
      initDropbox();
      cursor?.classList.toggle(styles.active);
    }
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = {
    id: context.query.id
  }

  return { props };
}

export default PracticeDetail;