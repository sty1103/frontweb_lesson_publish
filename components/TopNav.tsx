import styles from '@/styles/TopNav.module.scss';
import Button from '@/components/common/Button';
import { FaBell } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { MdMusicNote } from 'react-icons/md';
import router from 'next/router';
import React, { useEffect, useRef } from 'react';
import { moveUrl } from '@/lib/utils';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store/common';
import Image from 'next/image';

export default function TopNav() {
  const [user, setUser] = useRecoilState(userAtom);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.addEventListener('click', () => {
      initDropbox();
    });
  })

  const alertList = [
    { content: '우영미 님의 댓글: "멋있어요!"', time: '1분전', title: '너를만나 - 폴킴' },
    { content: '김승철 선생님이 새로운 노트를 남겼습니다.', time: '5분전', title: '너를만나 - 폴킴' },
    { content: '김승철 선생님에 신청한 레슨이 수락되었습니다.', time: '1시간 전', title: '너를만나 - 폴킴' },
    { content: '우영미 님의 댓글: "멋있어요!"', time: '1분전', title: '너를만나 - 폴킴' },
    { content: '김승철 선생님이 새로운 노트를 남겼습니다.', time: '5분전', title: '너를만나 - 폴킴' },
    { content: '김승철 선생님에 신청한 레슨이 수락되었습니다.', time: '1시간 전', title: '너를만나 - 폴킴' },
  ]

  return (
    <nav className={styles.nav} ref={navRef}>
      {/* <img src="" /> */}
      <div className={styles.logo} onClick={clickHome}>
        LESSON NOTE
      </div>

      <ul className={styles.menu}>
        <li onClick={e => clickMenu(e, 'post')}>게시글</li>
        <li onClick={e => clickMenu(e, 'song')}>곡 목록</li>
      </ul>

      <div className={styles.search}>
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
          <div className={styles.alert} onClick={clickAlert}>
            <FaBell />

            <div className={styles.dropbox}>
              <div className={styles.middle}>
                {alertList.map((v, k) => {
                  return (
                    <div className={styles.wrapper} key={k}>
                      <div className={styles.item}>
                        <div className={styles.title}>
                          {v.title}
                          <span>{v.time}</span>
                        </div>
                        <div className={styles.content}>
                          {v.content}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className={styles.profile} onClick={clickProfile}>
            <div className={styles.img}>
              {/* <Image /> */}
            </div>

            <div className={styles.dropbox}>
              <div className={styles.top}>
                프로필 정보

                <Button className={styles.logout} onClick={clickLogout}>
                  로그아웃
                </Button>
              </div>
              <div className={styles.middle}>
                <div className={styles.left}>
                  {/* <Image /> */}
                </div>
                <div className={styles.right}>
                  김도우

                  { user.type===0 && 
                    <div className={styles.level}>3년 미만 중급자</div>
                  }

                  { user.type===1 && 
                    <div className={styles.rate}><AiFillStar />3.8</div>
                  }

                  <div className={styles.instruments}>
                    <span>기타</span>
                    <span>피아노</span>
                    <span>드럼</span>
                    <span>바이올린</span>
                  </div>
                </div>
              </div>
              <div className={styles.bottom} onClick={() => moveUrl('/mypage')}>
                <BsPerson />마이페이지
              </div>
            </div>
          </div>
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

  function initDropbox() {
    const dropboxes = navRef.current?.querySelectorAll(`.${styles.dropbox}.${styles.active}`);

    dropboxes?.forEach((elem) => {
      elem.classList.remove(styles.active);
    })
  }

  function toggleDropbox(e: React.MouseEvent) {
    const cursor = e.currentTarget.querySelector(`.${styles.dropbox}`);
    
    if ( cursor?.classList.contains(styles.active) ) {
      initDropbox();
    } else {
      initDropbox();
      cursor?.classList.toggle(styles.active);
    }
  }

  function clickAlert(e: React.MouseEvent) {
    e.stopPropagation();
    toggleDropbox(e);
  }

  function clickProfile(e: React.MouseEvent) {
    e.stopPropagation();
    toggleDropbox(e);
  }

  function clickLogout() {
    setUser(null);
    moveUrl('/');
  }
}