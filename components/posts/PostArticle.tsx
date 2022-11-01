import styles from '@/styles/posts/PostArticle.module.scss';
import Button from '../common/Button';
import Image from 'next/image';
import router from 'next/router';
import { moveUrl } from '@/lib/utils';

export default function PostArticle() {
  return (
    <div className={styles.article} onClick={() => moveUrl(`/post/"postId"?type=article`)}>
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.title}>
            <span className={styles.type}>아티클</span>
            사랑받는 프로포즈 테마곡
          </div>
          <div className={styles.author}>
            <span>1시간 전</span>
          </div>
        </div>
      </div>

      <div className={styles.middle}>
        <div className={styles.img}>
          <Image
            src='/images/article.jpg'
            alt=''
            layout='fill'
            objectFit='cover'
          />
        </div>

        <div className={styles.desc}>
          인생에 한 번 뿐인 프로포즈, 정말 이대로 괜찮으신가요?
          <br/>
          뻔하디 뻔한 프로포즈! 여자친구가 절대! 이것만은 안 된다! 고 했던 진부한 프로포즈만 떠오르진 않나요? 결혼식 날짜는 가까워오는데 눈치만 보고 계시다면 이 프로젝트를 주목해주세요!
          <br/>
          특별하고 색다른, 거기에 감동까지 더해진 프로포즈, 평생 사랑받는 프로포즈 한번 만들어보세요!
        </div>
      </div>

      <div className={styles.bottom}>
        <Button shape='rect' onClick={()=>{}}>
          더보기
        </Button>
      </div>
    </div>
  )
}