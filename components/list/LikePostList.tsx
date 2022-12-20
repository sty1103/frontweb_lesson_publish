import { userAtom } from '@/store/common';
import styles from './LikePostList.module.scss';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import SongItem, { ISongData } from '@/components/item/song/SongItem';
import TeacherItem from '@/components/item/teacher/TeacherListItem';
import PostList from '@/components/list/PostList';

interface Props {
  className?: string;
}

export default function LikePostList({ className }: Props) {
  const user = useRecoilValue(userAtom);
  const subMenuData: any = {
    post: '게시글',
    song: '곡',
    teacher: '선생님'
  };

  const [ subMenu, setSubMenu ] = useState<string>('post');

  const songData: ISongData[] = [ ...Array(16) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  return (
    <section className={styles.root}>
      <ul className={styles.submenu}>
        {Object.keys(subMenuData).map((v) => {
          if ( v==='teacher' && user?.type===1 ) return;
          return (
            <li
              className={subMenu===v ? styles.active:''}
              key={v}
              onClick={e => clickSubMenu(e,v)}
            >{subMenuData[v]}</li>
          )
        })}
      </ul>

      { subMenu==='post' &&
        <PostList
          showFilterInstrument={false} 
          showFilterOrder={false}
          showFilterPost={false}
          showTitle={false}
          showLocationToggle={user?.type===0}
          className={styles.posts}
        />
      }

      { subMenu==='song' &&
        <div className={styles.songs}>
          {songData.map((v,k) => {
            return (
              <SongItem
                className={styles.item}
                data={v}
                key={k}
              />
            )
          })}
        </div>
        
      }

      { subMenu==='teacher' &&
        <div className={styles.teachers}>
          {[...Array(6)].map((v,k) => {
            return (
              <TeacherItem key={k} />
            )
          })}
        </div>
      }
    </section>
  )

  function clickSubMenu(e: React.MouseEvent, v: string) {
    setSubMenu(v);
  }
}