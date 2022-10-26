import PostsContainer from '@/containers/posts/PostsContainer';
import SongsContainer, { IData } from '@/containers/songs/SongsContainer';
import TeacherBoxContainer from '@/containers/TeacherBoxContainer';
import styles from '@/styles/mypage/MyPageLikes.module.scss';
import React, { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

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
        />
      }

      { subMenu==='song' &&
        <SongsContainer className={styles.song} data={songData} />
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