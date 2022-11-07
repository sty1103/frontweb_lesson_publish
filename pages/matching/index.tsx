import TextToggleButton from '@/components/common/TextToggleButton';
import PostsContainer from '@/containers/posts/PostsContainer';
import styles from '@/styles/matching/Matching.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Matching() {
  const [subMenu, setSubMenu] = useState<string>('songs');
  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <span>신청된 레슨매칭</span>
        
        <div className={styles.submenu}>
          <span
            className={subMenu==='posts' ? styles.active:''}
            onClick={e => clickSubMenu(e, 'posts')}
          >게시글</span>
          <span></span>
          <span
            className={subMenu==='songs' ? styles.active:''}
            onClick={e => clickSubMenu(e, 'songs')}
          >곡</span>
        </div>

        <TextToggleButton className={styles.toggle} leftText='비대면' rightText='동네' />
      </div>

      <div className={styles.content}>
        { subMenu==='posts' && 
          <PostsContainer
            showTitle={false}
            showFilterInstrument={false}
            showFilterOrder={false}
            showFilterPost={false}
            showLocationToggle={false}
          />
        }

        { subMenu==='songs' && 
          <div className={styles.songs}>
            {[...Array(10)].map((v,k) => {
              return (
                <div className={styles.song} key={k}>
                  <div className={styles.left}>
                    <div className={styles.profile}>
                      <div className={styles.top}>
                        <div className={styles.img}>
                          {/* <Image /> */}
                        </div>
                        <div className={styles.name}>
                          김은지
                        </div>
                      </div>
                      <div className={styles.middle}>
                        
                      </div>
                      <div className={styles.bottom}>
                      </div>
                    </div>
                  </div>
                  <div className={styles.right}>
                    
                  </div>
                </div>
              )
            })}
            
          </div>
        }
      </div>
    </section>
  )

  function clickSubMenu(e: React.MouseEvent, menu: string) {
    setSubMenu(menu);
  }
}