import SongsContainer, { IData } from '@/containers/songs/SongsContainer';
import styles from '@/styles/posts/PostArticleDetail.module.scss';
import Image from 'next/image';
import router from 'next/router';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsShare } from 'react-icons/bs';
import PageContent from '../common/layout/PageContent';
import PageNav from '../common/layout/PageNav';
import PageRoot from '../common/layout/PageRoot';

export default function PostArticle() {
  const songData: IData[] = [ ...Array(3) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  return (
    <PageRoot className={styles.postdetail}>
      <PageNav className={styles.nav} prevButton={true}>
        사랑받는 프로포즈 테마곡
      </PageNav>

      <PageContent className={styles.content}>
        <div className={styles.top}>
          <div className={styles.info}>
            <div className={styles.author}>
              <span>1시간 전</span>
              <span className={styles.seperator} />
              <span>아티클</span>
            </div>
          </div>

          <BsShare className={styles.share} />

          <div className={styles.like}>
            <AiOutlineHeart />
            <span>200</span>
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
          <SongsContainer data={songData} />
        </div>
      </PageContent>
    </PageRoot>
  )

  function clickPrev() {
    router.back();
  }
}