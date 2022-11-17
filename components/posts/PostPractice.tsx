import styles from '@/styles/posts/PostPractice.module.scss';
import Button from '../common/Button';
import { IoMdMusicalNote } from 'react-icons/io';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import ScoreDisplayContainer from '@/containers/score/ScoreDisplayContainer';
import router from 'next/router';
import { moveUrl } from '@/lib/utils';
import React, { useState } from 'react';
import User from '../common/User';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';

export default function PostPractice() {
  const user = useRecoilValue(userAtom);
  const [ like, setLike ] = useState<boolean>(false);
  
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.title} onClick={() => moveUrl(`/post/"postId"?type=practice`)}>
            <span className={styles.type}>게시글</span>
            유명한 곡 연주해봤어요. 한번 들어주세요
          </div>
          <div className={styles.author}>
            <span onClick={() => moveUrl('/profile/f0kjflakdjf')}>
              <span>
                {/* <img /> */}
              </span>
              <span>방구석뮤지션</span>
            </span>
            <span>1시간 전</span>
            <span></span>
            <span>피아노</span>
          </div>
        </div>

        { user?.type===0 &&
          <Button onClick={() => {}}>
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
        
      </div>

      <div className={styles.middle}>
        <div className={styles.title} onClick={() => moveUrl('/song/1a2b3c')}>
          <IoMdMusicalNote />
          베토벤 교향곡 제2번 D장조 Op.36
        </div>
        
        <div className={styles.score}>
          <ScoreDisplayContainer file='/musicxml/For_Exhibition_I will.xml' />
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
        <Button className={`${styles.like} ${like ? styles.active:''}`} shape='rect' onClick={clickLike}>
          <AiOutlineHeart className={styles.off} />
          <AiFillHeart className={styles.on} />
          좋아요
        </Button>
        <Button className={styles.comment} shape='rect' onClick={clickComment}>
          <BiComment />
          댓글
        </Button>
      </div>      
    </div>
  )

  function clickLike(e: React.MouseEvent) {
    setLike(!like);
  }

  function clickComment() {
    moveUrl('/post/1a2b3c?type=practice&comment=1', false);
  }
}