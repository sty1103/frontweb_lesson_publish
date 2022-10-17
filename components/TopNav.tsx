import styles from '@/styles/TopNav.module.scss';
import Button from '@/components/common/Button';
import { BiSearch } from 'react-icons/bi';
import router from 'next/router';

export default function TopNav() {
  return (
    <nav className={styles.nav}>
      {/* <img src="" /> */}
      <div className={styles.logo}>
        LESSON NOTE
      </div>

      <ul className={styles.menu}>
        <li className={styles.active}>게시글</li>
        <li>곡 목록</li>
      </ul>

      <div className={styles.search}>
        <BiSearch />
        검색어를 입력해주세요
      </div>

      {/* <Button className={styles.upload} onClick={() => {}}>
        <span className="material-symbols-outlined">
  music_note
  </span>
        <span>게시글 업로드</span>
      </Button> */}

      <div className={`${styles['sign-wrapper']}`}>
        <Button onClick={() => router.push('/signin')}>
          로그인
        </Button>

        <div className={styles.seperator}></div>

        <Button onClick={() => router.push('/signup')}>
          회원가입
        </Button>
      </div>
    </nav>
  );
}