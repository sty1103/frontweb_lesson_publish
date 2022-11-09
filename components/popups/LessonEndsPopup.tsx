import styles from '@/styles/popups/LessonEnds.module.scss';
import PopUp from '@/components/common/PopUp';
import Image from 'next/image';
import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Form } from 'react-bootstrap';
import Button from '../common/Button';

interface Props {
  className?: string;
  show?: boolean;
  onClose?: Function;
}

export default function LessonEndsPopup({ className, show, onClose=()=>{}}: Props) {
  const [rate, setRate] = useState<number>(0);
  return (
    <PopUp
      className={`${styles.root} ${className}`}
      show={show}
    >
      <div className={styles.img}>
        {/* <Image /> */}
      </div>
      <div className={styles.name}>
        김은수
      </div>

      <span className={styles.text}>
        수업이 어땠나요?
      </span>

      <div className={styles.rate}>
        
        {[...Array(rate)].map((v,k) => {
          return (
            <AiFillStar
              key={k}
              onClick={() => setRate(k+1)}
              className={styles.active}
            />
          )
        })}

        {[...Array(5-rate)].map((v,k) => {
          return (
            <AiFillStar
              key={k}
              onClick={() => setRate(rate+k+1)}
            />
          )
        })}
      </div>

      <div className={styles.review}>
        <Form.Control as='textarea' rows={4} placeholder='리뷰를 남겨주세요' />
        <Button className={styles.save} onClick={()=>onClose()}>
          레슨 종료하기
        </Button>
      </div>

      <div className={styles.notice}>
        해당 수업에 의해 수강권 <span>1</span>개가 차감되었습니다.
        <br/>
        현재 잔여 수강권 <span>3</span>개
      </div>
    </PopUp>
  )
}