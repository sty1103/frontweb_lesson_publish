import styles from '@/styles/TopNav.module.scss';
import Button from '@/components/common/Button';
import { BiSearch } from 'react-icons/bi';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { moveUrl } from '@/lib/utils';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store/common';
import Image from "next/legacy/image";
import ProfileDropdownContainer from '@/containers/ProfileDropdownContainer';
import AlertDropdownContainer from '@/containers/AlertDropdownContainer';
import UploadPopup from './popups/UploadPopup';
import { AiFillStar, AiOutlineMenu } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { FaBell } from 'react-icons/fa';

export default function TopNav() {
  const [user, setUser] = useRecoilState(userAtom);
  const navRef = useRef<HTMLElement>(null);
  const [uploadPopup, setUploadPopup] = useState<boolean>(false);
  const [menuPopup, setMenuPopup] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('click', () => {
      setMenuPopup(false);
    });
  })

  return (
    <nav className={styles.root} ref={navRef}>
      <div className={styles.content}>
        {/* <img src="" /> */}
        <div className={styles.logo} onClick={clickHome}>
          LESSON NOTE
        </div>

        <ul className={styles.menu}>
          <li onClick={e => clickMenu(e, 'post')}>게시글</li>

          { (!user || user?.type===0) &&
            <li onClick={e => clickMenu(e, 'song')}>곡목록</li>
          }
          
          { user?.type===1 &&
            <li onClick={e => clickMenu(e, 'matching')}>레슨매칭</li>
          }
        </ul>

        {/* <div className={styles.search} onClick={()=>{moveUrl('/search')}}>
          <BiSearch />
          검색어를 입력해주세요
        </div> */}
        <BiSearch
          onClick={()=>{moveUrl('/search')}}
          className={styles.search}
        />

        { (user?.type==0 && user.email) &&
          <Button className={styles.upload} onClick={() => moveUrl('/post/upload')}>
            {/* <MdMusicNote /> */}
            게시글 업로드
          </Button>
        }

        { user?.type===1 &&
          <Button className={styles.upload} onClick={() => setUploadPopup(true)}>
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

      <div className={styles['content--mobile']}>
        <AiOutlineMenu className={styles.menu} onClick={clickMenuMobile} />
        <span onClick={() => moveUrl('/')}>LESSON NOTE</span>

        <BiSearch
          onClick={()=>{moveUrl('/search')}}
          className={styles.search}
        />

        { user &&
          <div className={styles.alert}>
            <AlertDropdownContainer />
          </div>
        }

        <div className={`${styles.background} ${menuPopup ? styles.active:''}`}onClick={() => setMenuPopup(false)} />

        <ul className={`${styles['menu-popup']} ${menuPopup ? styles.active:''}`}>
          { user &&
            <li className={styles.profile}>
              <div className={styles.img}>

              </div>
              <div className={styles.name}>
                김가은 <IoIosArrowForward />
              </div>

              { user.type===0 && 
                <div className={styles.level}>3년 미만 중급자</div>
              }

              { user.type===1 && 
                <div className={styles.rate}><AiFillStar />3.8</div>
              }

              {/* <Button className={styles.signout} onClick={clickSignOut}>
                로그아웃
              </Button> */}
              <span className={styles.signout} onClick={clickSignOut}>로그아웃</span>
            </li>
          }

          { !user && 
            <>
              <li className={styles.signin} onClick={() => moveUrl('/signin')}>로그인</li>
              <li className={styles.signup} onClick={() => moveUrl('/signup')}>회원가입</li>
              
            </>
          }
            <li className={styles.posts}>게시글</li>
            <li className={styles.songs}>곡목록</li>
        </ul>
      </div>

      <UploadPopup show={uploadPopup} onClose={() => setUploadPopup(false)} />
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

  function clickMenuMobile() {
    setTimeout(()=>setMenuPopup(!menuPopup),0);
  }

  function clickSignOut() {
    setUser(null);
    localStorage.removeItem('user');
    moveUrl('/');
  }
}