import PostsContainer from '@/containers/posts/PostsContainer';
import SongContainer, { IData } from '@/containers/songs/SongContainer';
import TeacherBoxContainer from '@/containers/TeacherBoxContainer';
import styles from '@/styles/profile/ProfileLikes.module.scss';
import React, { useState } from 'react';

interface Props {
  className?: string;
}

export default function MyPageLikes({ className }: Props) {
  const subMenuData: any = {
    post: '게시글',
    song: '곡',
    teacher: '선생님'
  };

  const [ subMenu, setSubMenu ] = useState<string>('post');

  const songData: IData[] = [ ...Array(16) ];
  songData.map((v,k) => {
    songData[k] = { title: '너를 만나', artist: '풀킴', rate:4 };
  })

  return (
    <section className={styles.likes}>
      <ul className={styles.submenu}>
        {Object.keys(subMenuData).map((v) => {
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
        <PostsContainer
          showFilterInstrument={false} 
          showFilterOrder={false}
          showFilterPost={false}
          showTitle={false}
        />
      }

      { subMenu==='song' &&
        <div className={styles.songs}>
          {songData.map((v,k) => {
            return (
              <SongContainer
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
              <TeacherBoxContainer key={k} />
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