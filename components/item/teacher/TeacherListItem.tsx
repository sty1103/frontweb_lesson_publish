import styles from './TeacherListItem.module.scss';
import { AiFillHeart } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

interface Props {
  className?: string;
  onClick?: Function;
}

export default function TeacherListItem({ className, onClick=()=>{}}: Props) {
  return (
    <div className={`${styles.teacher} ${className}`} onClick={(e) => onClick(e)}>
      <div className={styles.top}>
        <AiFillHeart /> 300
      </div>

      <div className={styles.middle}>
        <div className={styles.img}>
          {/* <Image /> */}
          <div className={styles.checked}>
            <BsCheckLg />
          </div>
        </div>
        <div className={styles.name}>
          김비단
        </div>
        <div className={styles.career}>
          경력 12년차
        </div>
        <div className={styles.instrument}>
          피아노
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.students}>
          <span>324</span>
          <span>레슨 학생</span>
        </div>
        <div className={styles.rate}>
          <span>4.5</span>
          <span>별점(레슨 파워)</span>
        </div>
        <div className={styles.lessons}>
          <span>546</span>
          <span>레슨 완료</span>
        </div>
      </div>
    </div>
  )
}