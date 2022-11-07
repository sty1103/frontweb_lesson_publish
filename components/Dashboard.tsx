import { moveUrl } from '@/lib/utils';
import styles from '@/styles/Dashboard.module.scss';
import TextToggleButton from './common/TextToggleButton';

interface Props {
  className?: string
}

export default function Dashboard({ className }: Props) {
  return (
    <div className={`${styles.root} ${className}`}>
      <div className={styles.title}>
        레슨 중인 학생
        <TextToggleButton className={styles.toggle} leftText='비대면' rightText='동네' />
      </div>

      <div className={styles.content}>
        {[...Array(5)].map((v,k) => {
          return (
            <div
              className={styles.student}
              key={k}
              onClick={() => moveUrl('/lesson/"lessonId"')}
            >
              <div className={styles.left}>
                <div className={styles.img}>
                </div>
                <div className={styles.location}>
                  비대면
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.name}>
                  김은지
                </div>
                <div className={styles.song}>
                  베토벤 교향곡 제 1번 C장조 Op.21
                </div>
                <div className={styles.period}>
                  <span>레슨기간</span>
                  2022.8.22 ~ 8.31
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}