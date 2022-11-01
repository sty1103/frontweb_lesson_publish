import styles from '@/styles/AlertDropdown.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { FaBell } from 'react-icons/fa';

interface Props {
  className?: string;
  active?: boolean;
}

export default function AlertDropdown({ className, active}: Props) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const alertList = [
    { content: '우영미 님의 댓글: "멋있어요!"', time: '1분전', title: '너를만나 - 폴킴' },
    { content: '김승철 선생님이 새로운 노트를 남겼습니다.', time: '5분전', title: '너를만나 - 폴킴' },
    { content: '김승철 선생님에 신청한 레슨이 수락되었습니다.', time: '1시간 전', title: '너를만나 - 폴킴' },
    { content: '우영미 님의 댓글: "멋있어요!"', time: '1분전', title: '너를만나 - 폴킴' },
    { content: '김승철 선생님이 새로운 노트를 남겼습니다.', time: '5분전', title: '너를만나 - 폴킴' },
    { content: '김승철 선생님에 신청한 레슨이 수락되었습니다.', time: '1시간 전', title: '너를만나 - 폴킴' },
  ];

  useEffect(() => {
    window.addEventListener('click', () => {
      // initDropbox();
      setDropdown(false);
    });
  });

  return (
    <div className={`${styles.alert} ${className}`} onClick={clickAlert}>
      <FaBell />

      <div className={`${styles.dropbox} ${dropdown ? styles.active:''}`}>
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
  )

  function clickAlert(e: React.MouseEvent) {
    if ( dropdown ) {
      setDropdown(false);  
    } else {
      setTimeout(()=>setDropdown(true),0);
    }
  }
}