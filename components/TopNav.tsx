import styles from '@/styles/TopNav.module.scss';
import Button from '@/components/common/Button';
import { BiSearch } from 'react-icons/bi';
import { MdMusicNote } from 'react-icons/md';
import router from 'next/router';
import React, { useRef } from 'react';
import { moveUrl } from '@/lib/utils';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store/common';
import Image from 'next/image';
import ProfileDropdownContainer from '@/containers/ProfileDropdownContainer';
import AlertDropdownContainer from '@/containers/AlertDropdownContainer';

export default function TopNav() {
  const [user, setUser] = useRecoilState(userAtom);
  const navRef = useRef<HTMLElement>(null);

  return (
    <nav className={styles.root} ref={navRef}>
      <div className={styles.content}>
        {/* <img src="" /> */}
        <div className={styles.logo} onClick={clickHome}>
          LESSON NOTE
        </div>

        <ul className={styles.menu}>
          <li onClick={e => clickMenu(e, 'post')}>게시글</li>
          <li onClick={e => clickMenu(e, 'song')}>곡 목록</li>
        </ul>

        <div className={styles.search} onClick={()=>{moveUrl('/search')}}>
          <BiSearch />
          검색어를 입력해주세요
        </div>

        { (user?.type==0 && user.email) &&
          <Button className={styles.upload} onClick={(e:React.MouseEvent) => clickUpload(e, 0)}>
            <MdMusicNote />
            게시글 업로드
          </Button>
        }

        { user?.type===1 &&
          <Button className={styles.upload} onClick={(e:React.MouseEvent) => clickUpload(e, 1)}>
            곡·게시글 업로드
          </Button>
        }

        { user &&
          <>
            <AlertDropdownContainer />
            <ProfileDropdownContainer />
          </>
        }

        { !user &&
          <div className={`${styles['sign']}`}>
            <Button onClick={() => router.push('/signin')}>
              로그인
            </Button>

            <div className={styles.seperator}></div>

            <Button onClick={() => router.push('/signup')}>
              회원가입
            </Button>
          </div>
        }
      </div>
    </nav>
  );

  function initMenu() {
    navRef.current!.querySelector(`.${styles.active}`)?.classList.remove(styles.active);
  }

  function clickHome() {
    initMenu();
    moveUrl('/');
  }

  function clickMenu(e: React.MouseEvent, move: string) {
    initMenu();
    e.currentTarget.classList.add(styles.active);
    moveUrl(`/${move}`);
  }

  function clickUpload(e: React.MouseEvent, type: number) {
    if ( type ) {
      // 곡/게시물 업로드 팝업
    } else {
      /// 게시물 업로드
      moveUrl('/post/upload');
    }
  }
}