import { moveUrl } from '@/lib/utils';
import { userAtom } from '@/store/common';
import styles from '@/styles/ProfileDropdown.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import Button from './common/Button';

interface Props {
  className?: string;
}

export default function ProfileDropdown({ className }: Props) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userAtom);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('click', () => {
      setDropdown(false);
    });

    if ( !user ) {
      localStorage.removeItem('user');
    }
  })

  return (
    <div className={`${styles.profile} ${className}`} onClick={clickProfile} ref={profileRef}>
      <div className={styles.img}>
        {/* <Image /> */}
      </div>

      <div className={`${styles.dropbox} ${dropdown ? styles.active:''}`}>
        <div className={styles.top}>
          프로필 정보

          <Button className={styles.signout} onClick={clickSignOut}>
            로그아웃
          </Button>
        </div>
        <div className={styles.middle}>
          <div className={styles.left}>
            {/* <Image /> */}
          </div>
          <div className={styles.right}>
            김도우

            { user?.type===0 && 
              <div className={styles.level}>3년 미만 중급자</div>
            }

            { user?.type===1 && 
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
        <div className={styles.bottom} onClick={() => moveUrl('/profile/"uesrId"')}>
          <BsPerson />마이페이지
        </div>
      </div>
    </div>
  )

  function clickProfile(e: React.MouseEvent) {
    if ( dropdown ) {
      setDropdown(false);
    } else {
      setTimeout(()=>setDropdown(true),0);
    }
  }

  function clickSignOut() {
    setUser(null);
    localStorage.removeItem('user');
    moveUrl('/');
  }
}