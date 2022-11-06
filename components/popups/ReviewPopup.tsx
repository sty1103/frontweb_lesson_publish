import styles from '@/styles/popups/ReviewPopUp.module.scss';
import PopUp from '@/components/common/PopUp';
import { FaTimes } from 'react-icons/fa';
import { useRef } from 'react';
import ReviewBoxContainer from '@/containers/ReviewBoxContainer';

interface Props {
  show?: boolean;
  onClose?: Function;
}

export default function ReviewPopUp({ show, onClose=()=>{} }: Props) {
  const reviewRef = useRef<HTMLDivElement>(null);
  //test
  return (
    <PopUp
      className={styles.root}
      show={show} 
      onClose={() => onClose()}
    >
      <div className={styles.header}>
        리뷰보기
        <FaTimes onClick={() => onClose()} />
      </div>
      <div className={styles.content} ref={reviewRef}>
        {[...Array(10)].map((v,k) => {
          return (
            <ReviewBoxContainer className={styles.item} key={k} />
          )
        })}
      </div>
    </PopUp>
  )
}