import styles from '@/styles/TopNav.module.scss';
import Button from '@/components/common/Button';
import { FaBell } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { MdMusicNote } from 'react-icons/md';
import router from 'next/router';
import React, { useRef } from 'react';
import { moveUrl } from '@/lib/utils';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/common';
import Image from 'next/image';
import { Dropdown } from 'react-bootstrap';

export default function TopNav() {
  const user = useRecoilValue(userAtom);
  const navRef = useRef<HTMLElement>(null);
  return (
    <nav className={styles.nav} ref={navRef}>
      {/* <img src="" /> */}
      <div 
        className={styles.logo}
        onClick={clickHome}
      >
        LESSON NOTE
      </div>

      <ul className={styles.menu}>
        <li
          onClick={e => clickMenu(e, 'post')}
        >게시글</li>
        <li
          onClick={e => clickMenu(e, 'song')}
        >곡 목록</li>
      </ul>

      <div className={styles.search}>
        <BiSearch />
        검색어를 입력해주세요
      </div>

      { (user?.type==0 && user.email) &&
        <Button className={styles.upload} onClick={() => {}}>
          <MdMusicNote />
          게시글 업로드
        </Button>
      }

      { user?.type===1 &&
        <Button className={styles.upload} onClick={() => {}}>
          곡/게시글 업로드
        </Button>
      }

      { user &&
        <>
          <div className={styles.alert}>
            <FaBell />
          </div>
          <Dropdown className={styles.profile} autoClose='inside'>
            <Dropdown.Toggle id="dropdown-autoclose-false">
              
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                123
              </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
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

  function clickHome() {
    initActive();
    moveUrl('/');
  }

  function clickMenu(e: React.MouseEvent, move: string) {
    initActive();
    e.currentTarget.classList.add(styles.active);
    moveUrl(`/${move}`);
  }

  function initActive() {
    navRef.current!.querySelector(`.${styles.active}`)?.classList.remove(styles.active);
  }
}