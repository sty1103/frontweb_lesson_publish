import styles from './index.module.scss';
import Image from "next/legacy/image";
import React, { useState } from 'react';
import { IoMdMusicalNote } from 'react-icons/io';
import PageRoot from '@/components/layout/page/PageRoot';
import TextToggleButton from '@/components/button/toggle/TextToggleButton';
import PageContent from '@/components/layout/page/PageContent';
import PostList from '@/components/list/PostList';
import Button from '@/components/button/Button';
import SongItem from '@/components/item/song/SongItem';

export default function Matching() {
  const [subMenu, setSubMenu] = useState<string>('songs');
  const songData = { title: '너를 만나', artist: '풀킴', rate:4 };
  return (
    <PageRoot className={styles.root}>
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

      <PageContent className={styles.content}>
        { subMenu==='posts' && 
          <PostList
            showTitle={false}
            showFilterInstrument={false}
            showFilterOrder={false}
            showFilterPost={false}
            showLocationToggle={false}
            className={styles.posts}
          />
        }

        { subMenu==='songs' && 
          <div className={styles.songs}>
            {[...Array(10)].map((v,k) => {
              return (
                <div className={styles.item} key={k}>
                  <div className={styles.left}>
                    <div className={styles.top}>
                      <div className={styles.img}>
                        {/* <Image /> */}
                      </div>
                      <div className={styles.name}>
                        김은지
                      </div>
                    </div>
                    <div className={styles.middle}>
                      <div className={styles.instruments}>
                        <span>악기</span>
                        피아노
                      </div>
                      <div className={styles.date}>
                        <span>신청일</span>
                        2022.10.22
                      </div>
                    </div>
                    <div className={styles.bottom}>
                      <Button onClick={() => {}}>
                        <IoMdMusicalNote />
                        {/* 비대면 레슨 수락 */}
                        레슨 수락
                      </Button>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <SongItem data={songData} />
                  </div>
                </div>
              )
            })}
          </div>
        }
      </PageContent>
    </PageRoot>
  )

  function clickSubMenu(e: React.MouseEvent, menu: string) {
    setSubMenu(menu);
  }
}