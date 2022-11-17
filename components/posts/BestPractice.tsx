import { moveUrl } from '@/lib/utils';
import styles from '@/styles/posts/BestPractice.module.scss';
import React, { useRef, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import HorizontalSlider from '../common/HorizontalSlider';

export default function PopularVideos() {
  const [ clientX, setClientX ] = useState<number>(0);
  
  // 임시 데이터 생성
  let items = Array(20);
  for( let i=0; i<items.length; i++ ) items[i] = i;

  return (
    <section className={styles.root}>
      <div className={styles.title}>
        best practice
        <div>지금, 인기연습 영상</div>
      </div>

      <HorizontalSlider
        className={styles.items}
        clientX={clientX}
        setClientX={setClientX}
      >
        {
          items.map((item, index) => {
            return (
              <div className={styles.item} key={index} onClick={clickItem}>
                <div className={styles.img}>
                  {/* <img src=''></img> */}
                </div>
                <div className={styles.text}>
                  <div className={styles.top}>
                    베토벤 교향곡 제 1번 C장조 Op21 ({index+1})
                  </div>
                  <div className={styles.bottom}>
                    <AiFillEye /> 1,283
                    <BiCommentDetail /> 32
                  </div>
                </div>
              </div>
            )
          })
        } 
      </HorizontalSlider>
    </section>
  )

  function clickItem(e: React.MouseEvent) {
    if (clientX !== e.clientX ) {
      e.preventDefault()
    } else {
      moveUrl('/post/"postId"?type=practice');
    }
  }
}