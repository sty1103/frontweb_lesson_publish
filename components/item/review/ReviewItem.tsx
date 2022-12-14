import styles from './ReviewItem.module.scss';
import { AiFillStar } from 'react-icons/ai';
import { IoMdMusicalNote } from 'react-icons/io';

interface Props {
  className?: string;
}

export default function ReviewItem({ className }: Props) {
  return (
    <div className={`${styles.review} ${className}`}>
      <div className={styles.title}>
        <div className={styles.left}>
          {/* <Image /> */}
        </div>
        <div className={styles.right}>
          <div className={styles.profile}>
            김도우

            <div className={styles.instruments}>
              <span>피아노</span>
            </div>
          </div>
          <div className={styles.song}>
            <IoMdMusicalNote />
            베토벤 교향곡 제2번 D 
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.rate}>
          {[...Array(Math.round(4))].map((V, K) => {
              return (
                <AiFillStar className={`${styles.active}`} key={K} />
              )
            })}

            {[...Array(1)].map((V, K) => {
              return (
                <AiFillStar key={K} />
              )
            })}

            <span>3.8</span>
        </div>
        <div>
          취미로 배워보려고 시작했는데 지금은 연습도 많이하고 진료도 바꿔보려고 고민하고 있어요. 하면 할수록 더 풍미도 생기고 실력이 느는 걸 느끼니까 더 열심히 하게되는 것 같아요. 선생님이랑 많이 친해져서 이제는 고민 상담 같은 것도 많이 하고 의지하게 돼요ㅠㅠ
          <br/>
          선생님이 기초를 딱 잡아주시니까 정말 그전보다 훨씬 실력도 빨리 느는 거 같아요~ 앞으로 더 배워서 실력 좀 많이 쌓고 싶어요ㅎㅎ 열심히 하겠습니다.
        </div>
      </div>
    </div>
  )
}